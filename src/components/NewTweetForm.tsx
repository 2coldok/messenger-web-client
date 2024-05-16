import React, { useState } from 'react';
import { ITweet, ITweetService } from '../types/twitterTypes';

interface INewTweetFormProps {
  tweetService: ITweetService;
  onError: (error: string) => void;
  onCreated: (tweet: ITweet) => void;
}

export default function NewTweetForm({ tweetService, onError, onCreated }: INewTweetFormProps) {
  const [tweet, setTweet] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tweetService
      .postTweet(tweet)
      .then((created) => {
        setTweet('');
        onCreated(created);
      })
      .catch((error) => onError(getErrorMessage(error)));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTweet(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='New Tweet Here'
        value={tweet}
        required
        autoFocus
        onChange={onChange}
      />
      <button type='submit'>post</button>      
    </form>
  );
}

function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  } else if (error instanceof Error) {
    return error.toString();
  } else {
    return "알수 없는 에러";
  }
}