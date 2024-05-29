import { useParams } from "react-router-dom";
import { ITweet, ITweetService } from "../service/TweetService";
import { useEffect, useState } from "react";

interface IMyTweetsProp {
  tweetService: ITweetService;
}

export default function MyTweets({ tweetService }: IMyTweetsProp) {
  const { username } = useParams();
  const [myTweets, setMyTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    tweetService.getTweets(username)
    .then((tweets) => setMyTweets(tweets))
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error.toString());
      } else {
        console.log(`MyTweets.tsx : error가 Error객체가 아님`); 
      }
    })
  })

  return (
    <div>
      {myTweets.map((myTweets) => (
        <li key={myTweets.tweetId}>
          <h1>{myTweets.username}</h1>
          <p>{myTweets.name}</p>
          <p>{myTweets.text}</p>
          <p>{myTweets.createdAt}</p>
        </li>
      ))}
    </div>
  );
}

