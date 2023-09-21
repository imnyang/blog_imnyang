// components/BlogList.tsx

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './BlogList.module.css'; // CSS 모듈을 가져옵니다.

interface Blog {
  num: number;
  title: string;
  slug: string;
  date: string;
  time: string;
}

function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // API로부터 데이터 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch('/api/list'); // API 엔드포인트에 맞게 경로를 설정해야 합니다.
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul className={styles.blogList}>
        {blogs.map((blog) => (
          <li key={blog.num} className={styles.blogItem}>
            <Link className={styles.blogLink} href={`/v/${blog.slug}`}>
              <h3 className={styles.blogTitle}>{blog.title}</h3>
              <p className={styles.blogInfo}>
                <span className={styles.blogDate}>Date: {blog.date}</span>
                <span className={styles.blogTime}>Time: {blog.time}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div >
  );
}

export default BlogList;
