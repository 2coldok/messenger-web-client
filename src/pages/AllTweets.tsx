import { useEffect, useState } from "react";
import { ITweet, ITweetServiceProp } from "../types/twitterTypes";
import ShowError from "../components/ShowError";
import styled from "styled-components";
import TweetCard from "../components/TweetCard";
import NewTweetForm from "../components/NewTweetForm";

export default function AllTweets({ tweetService }: ITweetServiceProp) {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [error, setError] = useState<string>('');

  // then을 이용해 데이터 가져오기
  // useEffect(() => {
  //   tweetService.getTweets()
  //     .then((tweets) => setTweets([...tweets]))
  //     .catch((error) => {
  //       console.error('tweet fatch 실패', error)
  //     })
  // }, [tweetService])

  // await를 이용해 데이터 가져오기 (함수 선언식)
  // useEffect(() => {
  //   const fetchTweets = async () => {
  //     try {
  //       const tweets = await tweetService.getTweets();
  //       setTweets([...tweets]);
  //     } catch (error) {
  //       console.error('tweet fetch 실패', error);
  //     }
  //   }

  //   fetchTweets();
  // })

  // await를 이용해 데이터 가져오기 (함수 표현식)
  useEffect(() => {
    (async () => {
      try {
        const tweets = await tweetService.getTweets();
        setTweets([...tweets]);
      } catch (error) {
        onError(getErrorMessage(error));
      }
    })();
  }, [tweetService])

  const onError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const onDelete = (tweetId: string) => {
    tweetService
      .deleteTweet(tweetId)
      .then(() => setTweets((tweets) => tweets.filter((tweet) => tweet.tweetId !== tweetId)))
      .catch((error) => onError(error.toString()));
  };

  const onUpdate = (tweetId: string, text: string) => {
    tweetService
      .updateTweet(tweetId, text)
      .then((updated) =>
        setTweets((tweets) =>
          tweets.map((item) => (item.tweetId === updated.tweetId ? updated : item))
        ))
      .catch((error) => onError(getErrorMessage(error)));
  }

  const onCreated = (tweet: ITweet) => {
    setTweets((tweets) => [tweet, ...tweets]);
  }
    
  return (
    <StyledContainer>
      <ShowError error={error} />
      <NewTweetForm tweetService={tweetService} onError={onError} onCreated={onCreated} />
      <h1>여긴 AllTweets.tsx</h1>
      <ul>
        {tweets.map((tweet) => (
          <TweetList key={tweet.tweetId}>
            <TweetCard tweet={tweet} onUpdate={onUpdate} onDelete={onDelete}  />
          </TweetList>
        ))}
      </ul>
    </StyledContainer>
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

const StyledContainer = styled.div`
  width: 500px;
  border: 1px solid #92a5da;
  padding: 1rem;
  border-radius: 0.5rem;

  & > h1 {
    color: #92a5da;
  }
`;

const TweetList = styled.li`
  
  border: 1px solid white;
  border-radius: 0.5rem;
  padding: 10px;
  margin: 10px;
`;
