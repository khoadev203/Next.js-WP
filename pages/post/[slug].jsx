import React from 'react';
import Header from "../../components/header";
import Footer from "../../components/footer";

function Post(props) {
  const {post, media, tags} = props
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
            <img src={media[0].source_url} />
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
            <div id="related-post">
              <img src="/img/post-banner-01.jpg" />
                <h3>Ut risus metus, eleifend sit amet ullamcorper in, molestie ultrices nulla.</h3>
            </div>
            <div id="related-post">
              <img src="/img/post-banner-02.jpg" />
                <h3>Sed volutpat diam nec sem ornare porta. Nullam sagittis in nulla at sodales.</h3>
            </div>
            <div id="related-post">
              <img src="/img/post-banner-03.jpg" />
                <h3>Etiam a leo sed augue mattis ullamcorper. Etiam at tristique ligula.</h3>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  let res = await fetch(`${process.env.API_URL}/wp/v2/posts?slug=${params.slug}`)
  const post = await res.json()
  res = await fetch(`${process.env.API_URL}/wp/v2/tags?post=${post[0].id}`)
  const tags = await res.json()
  res = await fetch(`${process.env.API_URL}/wp/v2/media?parent=${post[0].id}`)
  const media = await res.json()
  return {
    props: {
      post,
      tags,
      media
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