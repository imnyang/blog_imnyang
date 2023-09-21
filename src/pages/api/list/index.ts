import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// PostgreSQL 데이터베이스 연결 정보 설정
const pool = new Pool({
  user: process.env.NEXT_PUBLIC_DBUSER,
  host: process.env.NEXT_PUBLIC_DBHOST,
  database: process.env.NEXT_PUBLIC_DBNAME,
  password: process.env.NEXT_PUBLIC_DBPASSWORD,
  port: parseInt(process.env.NEXT_PUBLIC_DBPORT || '5432'), // PostgreSQL 포트
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await pool.connect();
    // 변경된 SQL 쿼리로 num을 내림차순으로 정렬하고 최근 5개 레코드를 가져옵니다.
    const result = await client.query(
      'SELECT num, title, description, date, slug, time FROM Blog ORDER BY num DESC LIMIT 5'
    );
    client.release();

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Items not found' });
    }

    // 결과를 JSON 형태로 반환합니다.
    const items = result.rows.map((item) => ({
      num: item.num,
      title: item.title,
      description: item.description,
      date: item.date,
      slug: item.slug,
      time: item.time,
    }));

    return res.status(200).json(items);
  } catch (err) {
    // 오류 객체의 메시지를 포함시켜 JSON 응답으로 반환합니다.
    return res.status(500).json({ error: err.message });
  }
}
