import React, { useState } from 'react';
import { ITweet } from '../types/twitterTypes';
import styled from 'styled-components';

interface IEditTweetForm {
  tweet: ITweet;
  onUpdate: (tweetId: string, text: string) => void;
  onClose: () => void;
}

export default function EditTweetForm({ tweet, onUpdate, onClose }: IEditTweetForm) {
  const [text, setText] = useState(tweet.text);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUpdate(tweet.id, text);
    onClose();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <StyledContainer>
      <h1>여긴 EditTweetForm.tsx</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Edit your tweet'
          value={text}
          required
          autoFocus
          onChange={onChange}
         />
        <button type='submit'>update</button>
        <button type='button' onClick={onClose}>cancel</button>
      </form>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  border: 1px solid #C477DB;
  & > h1 {
    color: #C477DB;
  }
  border-radius: 0.5rem;
`;

