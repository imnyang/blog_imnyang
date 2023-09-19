import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import remark from 'remark';
import remarkReact from 'remark-react';
import ReactMarkdown from 'react-markdown';

export default function Page() {
  const router = useRouter();
  const queries = router.query;
  const pageParam = queries.page || '';

  useEffect(() => {
    if (!router.isReady) return;
    console.log(pageParam, 'Let\'s Go!');
  }, [router.isReady]);

  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    setLoading(true); // API 요청 전에 로딩 상태를 true로 설정

    // 여기서 데이터를 가져오는 API 요청을 수행하고 값을 설정합니다.
    // 예를 들어, /api/items/slub 경로로 API 요청을 보내고 결과를 받아온다고 가정합니다.
    fetch(`/api/items/${pageParam}`)
      .then(response => response.json())
      .then(data => {
        // API에서 받아온 데이터를 사용해 값을 설정합니다.
        setTitle(data.title);
        setDescription(data.description);
        setDate(data.date);
        setTime(data.time);
        setLoading(false); // API 요청 완료 후 로딩 상태를 false로 설정
        console.log(data.description);
      })
      .catch(error => {
        console.error('API 요청 실패:', error);
        setLoading(false); // API 요청 실패 시에도 로딩 상태를 false로 설정
      });
  }, [pageParam]);

  return (
    <main className="par_box">
      <div className="box2">
        <div className="name">
          <img src="https://pbs.twimg.com/profile_images/1700879829871312896/ZnllLd52_400x400.jpg" />
          <div>
            <a className="h-1 ml-4 text-xl" href="https://twitter.com/im_se_mir">{`세미르 💕`}</a><br />
            <a className="h-1 ml-4 text-sm text-gray-200" href="https://twitter.com/im_se_mir">{`@im_se_mir`}</a><br />
            <p className="h-1 text-sm text-gray-400">{pageParam}</p>
          </div>
        </div>
        <br /><br />
        <h1 className="ml-6">{title}</h1>
        {loading ? (
          // 로딩 중일 때 로딩 화면을 표시
          <p>로드중...</p>
        ) : (
          // 로딩이 완료되면 Markdown 내용을 표시
          <div className="markdown">
            <ReactMarkdown className="markdown">{description}</ReactMarkdown>
          </div>
        )}
        <br />
        <p className="ml-6 text-gray-400">{`Date: ${date} - Time: ${time} · Post in localhost`}</p>
      </div>
    </main >
  );
}
