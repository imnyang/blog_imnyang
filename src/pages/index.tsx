import BlogList from "@/components/BlogList";
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 화면 크기가 768px 이하인 경우 모바일로 간주
    const isMobileScreen = window.innerWidth <= 768;

    setIsMobile(isMobileScreen);

    // 화면 크기가 변경될 때마다 확인
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth <= 768);
    });

    return () => {
      // 컴포넌트가 언마운트되면 리스너 제거
      window.removeEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 768);
      });
    }
  }, []);

  return (
    <main className="par_box">
      <div className="box">
        <div className="name">
          <img src="https://pbs.twimg.com/profile_images/1700879829871312896/ZnllLd52_400x400.jpg" />
          <div>
            <a className="h-1 ml-4 text-xl" href="https://twitter.com/im_se_mir">{`세미르 💕`}</a><br />
            <a className="h-1 ml-4 text-sm text-gray-200" href="https://twitter.com/im_se_mir">{`@im_se_mir`}</a>
          </div>
        </div>
        <p>아임냥의 잡다한 작업실입니다.</p>
        <p>보통 헛소리나 정보 관련쪽으로 올라옵니다.</p>
        <p>헉 헛소리 쓸게 떨어졌어요...</p>
        <br />
        <a className="ml-6" href="mailto:se.mir@imnyang.xyz">se.mir@imnyang.xyz</a>
        <br />
        <p>@imnyang</p>
        <br /><br /><br />
        <p className="text-gray-400">Now · Post in localhost</p>
      </div>
      <div className={`box ${isMobile ? '' : 'ml-10'}`}>
        <h1 className="ml-8 mt-10">Latest</h1>
        <BlogList />
      </div>
    </main>
  )
}
