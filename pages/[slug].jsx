import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Header from "../components/header";
import Footer from "../components/footer";
import {fetchRelatedPosts} from "../lib/api";
import Head from "next/head";
import SocialShare from "../components/social-share";

function Post(props) {
  const {post, media, tags, relatedPosts} = props
  const [url, setUrl] = useState('')
  useEffect(() => {
    setUrl(window.location.href)
  }, [post])

  return(
    <>
      <Head>
        {
          post[0].yoast_head
          ? (
            <>
              <meta property="og:locale" content={post[0].yoast_head_json.og_locale} />
              <meta property="og:type" content={post[0].yoast_head_json.og_type} />
              <meta property="og:title" content={post[0].yoast_head_json.og_title} />
              <meta property="og:url" content={post[0].yoast_head_json.og_url} />
              <meta property="og:description" content={post[0].yoast_head_json.og_description} />
              <meta property="og:image" content={post[0].yoast_head_json.twitter_image} />
              <meta name="description" content={post[0].yoast_head_json.description} />
              <title>{post[0].yoast_head_json.title}</title>
            </>
            ) : ''
        }
      </Head>
      <Header />
      <div className="container single-post-container">
        <article>
          <h1 dangerouslySetInnerHTML={{__html: post[0].title.rendered}}></h1>
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
          {
            post[0].asin ?
              <iframe width={120} height={240} style={{width:'120px',height:'240px'}} marginWidth="0" marginHeight="0" scrolling="no" frameBorder="0"
                      src={`//rcm-eu.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=effettoplacebo-21&o=29&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=${post[0].asin}&linkId=4ad00ce0073be432e5cd9a2d65b6d620`}></iframe>
              :
              ''
          }

          <SocialShare post={post[0]} url={url} />
          <h6>Related Posts</h6>
          <div className="sidebar-related-posts">
            {
              relatedPosts.length ?
                relatedPosts.map((post) => {
                  return (
                    <Link href={`/${post.slug}`}>
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
  let media = {}
  if(post[0]._embedded['wp:featuredmedia']) {
    media = post[0]._embedded['wp:featuredmedia'][0].media_details.sizes.full
  }
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