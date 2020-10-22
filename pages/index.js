// pages/index.js
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Link from 'next/link';
import { css } from 'emotion';
import { listPosts } from '../src/graphql/queries';

export default function Home() {
  const [posts, updatePosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const postData = await API.graphql({ query: listPosts });
    updatePosts(postData.data.listPosts.items);
  }
  return (
    <div className={containerStyle}>
     <h1>Posts</h1>
     {
       posts.map(post => (
        <Link key={post.id} href={`/posts/[id]`} as={`/posts/${post.id}`}>
          <h2 className={linkStyle}>{post.name}</h2>
        </Link>
       ))
     }
    </div>
  )
}

const containerStyle = css`width: 700px; margin: 0 auto;`;
const linkStyle = css`cursor: pointer; padding: 10px 0px; border-bottom: 1px solid #ddd;`;