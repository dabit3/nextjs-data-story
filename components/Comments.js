import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { commentsByPostId } from '../src/graphql/queries';
import { createComment } from '../src/graphql/mutations';

const initialState = { message: '' };

export default function Comments({ postId }) {
  const [comments, updateComments] = useState([]);
  const [formState, updateFormState] = useState(initialState);
  useEffect(() => {
    fetchComments();
  }, []);
  function onChange(e) {
    e.persist();
    updateFormState({ message: e.target.value });
  }
  async function fetchComments() {
    const commentData = await API.graphql({ query: commentsByPostId, variables: { postId }})
    updateComments(commentData.data.commentsByPostId.items);
  }
  async function createCommentMutation() {
    if (!formState.message) return;
    const id = Math.random().toString(36).slice(-6);
    updateComments([...comments, { id, message: formState.message, username: user.username }]);
    await API.graphql({
      query: createComment,
      variables: { input: { postId, message: formState.message }},
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    updateFormState(initialState);
  }
  return (
    <div>
      <h3>Create Comment</h3>
        <input placeholder="Comment" onChange={onChange} value={formState.message} />
        <button onClick={createCommentMutation}>Create Comment</button>
      <h3>Comments</h3>
      {
        comments.map(comment => (
          <div key={comment.id}>
            <h3>{comment.message}</h3>
            <span>by: {comment.username}</span>
          </div>
        ))
      }
    </div>
  )
}