import { useState } from 'react';
import EditTweetForm from './EditTweetForm';
import { ITweet } from '../types/twitterTypes';

interface ITweetCardProps {
  tweet: ITweet;
  onUpdate: (tweetId: string, text: string) => void;
  onDelete: (tweetId: string) => void;
}

export default function TweetCard({ tweet, onUpdate, onDelete }: ITweetCardProps) {
  const [editing, setEditing] = useState(false);
  
  return (
    <>
      <h1>여긴 TweetCard.tsx</h1>
      <h3>별명 : {tweet.username}</h3>
      <p>이름 : {tweet.name}</p>
      {/* <p>url : {tweet.url}</p> */}
      <p>내용 : {tweet.text}</p>
      <button onClick={() => setEditing((prev) => !prev) } style={{backgroundColor: '#478BE6'}}>수정</button>
      <button onClick={() => onDelete(tweet.id)} style={{backgroundColor: '#E5534B'}}>삭제</button>
      { editing && <EditTweetForm tweet={tweet} onUpdate={onUpdate} onClose={() => setEditing(false)} />}
    </>
  );
}

