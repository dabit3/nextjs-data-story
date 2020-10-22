import { API } from 'aws-amplify';
import { getPost, listPosts } from '../../src/graphql/queries'
import '../../configureAmplify';
import { useRouter } from 'next/router';
import Comments from '../../components/Comments';
import checkUser from '../../helpers/checkUser';

export default function Post({ post }) {
  const router = useRouter();
  const user = checkUser();
  if (router.isFallback) return <div>Loading...</div>
  return (
    <div>
      <h2>{post.name}</h2>
      <p>{post.content}</p>
      <span>By: {post.username}</span>
      { user && <Comments postId={post.id} /> }
    </div>
  )
}

export async function getStaticPaths() {
  const postData = await API.graphql({ query: listPosts });
  const postIds = postData.data.listPosts.items.map(post => ({ params: { id: post.id } }));
  return {
    paths: postIds, fallback: true
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const post = await API.graphql({ query: getPost, variables: { id } });
  console.log({ post: JSON.stringify(post) });
  return {
    props: {
      post: post.data.getPost
    }
  }
}