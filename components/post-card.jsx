import React,{ useEffect, useState, useRef}  from "react";
import Link from "next/link";
import {username, application_password} from "../lib/constant";

function PostCard(props) {
  const { post } = props;
  const [card, setCard] = useState(post)
  const likesSpan = useRef(null);

  function likesCount(post) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/posts/${post.id}`, {
      // make sure to authenticate or pass the X-WP-Nonce value as a header
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+btoa(username + ':' + application_password)
      },
      body: JSON.stringify({
        "likes_count": card.likes_count + 1
      })
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setCard(data)
        likesSpan.current.innerText = `${parseInt(card.likes_count)+1} likes`;
      })
      .catch(error => console.log('error', error));
      
  }

  return (
    <div>
      <Link href={`/${post.slug}`} >
        <div className="post-card">
          <div className="post-card-banner">
            {post.featured_media &&
            post._embedded["wp:featuredmedia"][0].media_details.sizes
              .thumbnail ? (
              <img
                src={
                  post._embedded["wp:featuredmedia"][0].media_details.sizes
                    .thumbnail.source_url
                }
              />
            ) : (
              <img src="/img/placebo-effect.webp" />
            )}
          </div>
          <div className="post-card-title">
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h2>
          </div>
          <div
            className="post-card-excerpt"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          ></div>
          {/* <div className="d-flex justify-between items-center">
            <div className="post-card-date">
              <span>{post.date.split("T")[0]}</span>
            </div>
            <div className="d-flex counts">
              <span className="views">{post.views_count} views</span>
              <span className="likes">{post.likes_count} likes</span>
            </div>
          </div> */}
        </div>
      </Link>
      <div
        className="d-flex justify-between items-center"
        style={{ margin: "0px 10px" }}
      >
        <div className="post-card-date">
          <span>{post.date.split("T")[0]}</span>
        </div>
        <div className="d-flex counts">
          <span className="views">{post.views_count} views</span>
          <span className="likes" onClick={()=>likesCount(post)} ref={likesSpan}>
            {post.likes_count} likes
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
