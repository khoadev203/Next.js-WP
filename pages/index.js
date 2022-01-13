import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Carousel from "../components/carousel";
import Categories from "../components/categories";
import PostCard from "../components/post-card";

function Home(props) {
  const {categories, posts} = props
  console.log(posts)
  return (
    <>
      <Header />

    <div id="mainContainer">
      <Carousel />
      <div id="searchMobile" className="container">
        <div className="search-container">
          <input className="search-input" type="search" placeholder="Search" />
        </div>
      </div>
      <div className="catNav container">
        <Categories categories={categories} />
        <div id="searchDesktop" className="search-container">
          <input className="search-input" type="search" placeholder="Search" />
        </div>
      </div>

      <div className="postsRow container">
        {posts.length &&
          posts.map((post,index) => {
            return (
              <PostCard key={`post_${post.id}`} post={post} />
            )
          })
        }
      </div>
    </div>
      <Footer/>
    </>
  )
}

export async function getServerSideProps() {
  let res = await fetch(`${process.env.API_URL}/wp/v2/categories`)
  const categories = await res.json()
  res = await fetch(`${process.env.API_URL}/wp/v2/posts`)
  const posts = await res.json()
  return {
    props: {
      categories,
      posts
    }
  }
}

export default Home;