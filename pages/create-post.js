import { useState } from 'react';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { css } from 'emotion';
import { useRouter } from 'next/router';
import { createPost } from '../src/graphql/mutations';
import { API } from 'aws-amplify';

function CreatePost() {
  const [formState, updateFormState] = useState({ name: '', content: ''});
  const router = useRouter();
  function onChange(e) {
    e.persist();
    updateFormState(state => ({ ...state, [e.target.name]: e.target.value }));
  }
  async function createPostMutation() {
    if (!formState.name || !formState.content) return;
    const { data } = await API.graphql({
      query: createPost, variables: { input: formState }, authMode: "AMAZON_COGNITO_USER_POOLS"
    });
    router.push(`/posts/${data.createPost.id}`);
  }
  return (
    <div>
      <div className={formStyle}>
        <input
          placeholder="Post name"
          name="name"
          onChange={onChange}
          className={inputStyle}
        />
        <textarea
          placeholder="Post content"
          name="content"
          onChange={onChange}
          className={inputStyle}
        />
        <button onClick={createPostMutation} className={buttonStyle}>Create Post</button>
      </div>
      <AmplifySignOut />
    </div>
  )
}

const formStyle = css`{ display: flex; flex-direction: column; margin: 40px; }`
const inputStyle = css`{ padding: 7px; margin-bottom: 8px; width: 700px; }`
const buttonStyle = css`{
   background-color:
   black; width: 400px;
   height: 40px;
   color: white;
   font-size: 16px;
   cursor: pointer;
}`

export default withAuthenticator(CreatePost);
