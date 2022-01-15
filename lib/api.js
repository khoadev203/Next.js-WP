export async function fetchPosts(page, category, search= null) {
  let url = ''
  if(category === 'All') {
    url = `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/posts?page=${page}&per_page=6`
  }else {
    url = `${process.env.NEXT_PUBLIC_API_URL}/wp/v2/posts?page=${page}&per_page=6&categories=${category}`
  }
  if(search) {
    url = `${url}&search=${search}`
  }
  try {
    const res = await fetch(url)
    const data = await res.json();
    if(!Array.isArray(data)) {
      return []
    }else {
      return data;
    }
  }catch (e) {
    return []
  }
}

export async function fetchCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp/v2/categories`)
  return await res.json()
}