import React from 'react';
import Link from 'next/link';
import Header from "../../components/header";
import Footer from "../../components/footer";
import {fetchRelatedPosts} from "../../lib/api";

function Post(props) {
  const {post, media, tags, relatedPosts} = props
  console.log(relatedPosts)
  return(
    <>
      <Header />
      <div className="container single-post-container">
        <article>
          <h1>{post[0].title.rendered}</h1>
          <span className="single-post-date">{post[0].date.split('T')[0]}</span>
          <div id="single-post-tags">
            <ul>
              {
                tags.length ?
                tags.map((tag, index) => {
                  return (
                    <li key={index}>{tag.name}</li>
                  )
                })
                  : ''
              }
            </ul>
          </div>
          <div className="single-post-banner">
            <img src={media.source_url} />
          </div>
          <div className="single-post-content" dangerouslySetInnerHTML={{__html: post[0].content.rendered}}>

          </div>
        </article>
        <aside>
          <h6>Share Posts</h6>
          <div className="sidebar-social-share">
            <i className="fab fa-twitter"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-telegram"></i>
            <i className="fab fa-reddit"></i>
            <i className="fab fa-vk"></i>
            <i className="fab fa-weibo"></i>
          </div>
          <h6>Related Posts</h6>
          <div className="sidebar-related-posts">
            {
              relatedPosts.length ?
                relatedPosts.map((post) => {
                  return (
                    <Link href={`/post/${post.slug}`}>
                      <a className="related-post">
                        {
                          post.featured_media ?
                            <img src={post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url} />
                            :
                            <img src="img/post-banner-01.jpg"/>
                        }
                        <h3>{post.title.rendered}</h3>
                      </a>
                    </Link>
                  )
                })
                :
                <h4>No posts found</h4>
            }
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  let res = await fetch(`${process.env.API_URL}/wp/v2/posts?_embed&slug=${params.slug}`)
  const post = await res.json()
  const media = post[0]._embedded['wp:featuredmedia'][0].media_details.sizes.full
  res = await fetch(`${process.env.API_URL}/wp/v2/tags?post=${post[0].id}`)
  const tags = await res.json()
  const relatedPosts = await fetchRelatedPosts(post[0].tags)
  return {
    props: {
      post,
      tags,
      media,
      relatedPosts
    }
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_URL}/wp/v2/posts`)
  const posts = await res.json()
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))
  return { paths, fallback: false }
}
export default Post;