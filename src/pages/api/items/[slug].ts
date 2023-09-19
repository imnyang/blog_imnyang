import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// PostgreSQL 데이터베이스 연결 정보 설정
const pool = new Pool({
  user: process.env.NEXT_PUBLIC_DBUSER,
  host: process.env.NEXT_PUBLIC_DBHOST,
  database: process.env.NEXT_PUBLIC_DBNAME,
  password: process.env.NEXT_PUBLIC_DBPASSWORD,
  port: process.env.NEXT_PUBLIC_DBPORT, // PostgreSQL 포트
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
  } = req;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug parameter' });
  }

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT num, title, description, date, slug, time FROM Blog WHERE slug = $1', [slug]);
    client.release();

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const item = result.rows[0];
    const response = {
      num: item.num,
      title: item.title,
      description: item.description,
      date: item.date,
      slug: item.slug,
      time: item.time,
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
