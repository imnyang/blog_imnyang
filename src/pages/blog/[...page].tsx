import { useRouter } from 'next/router';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHTML from 'remark-html';

export default function Page() {
  const router = useRouter();

  // Markdown 형식의 텍스트
  const markdownText = `
  # 약간 손 글씨체 느낌으로 블로그를 만들 예정
  ## Here is Localhost!
  I like nextjs btw~
  `;

  // Markdown을 HTML로 변환
  const htmlText = unified()
    .use(remarkParse)
    .use(remarkHTML, { sanitize: true, allowDangerousHTML: true })
    .processSync(markdownText)
    .toString();
  console.log(htmlText)
  return (
    <div>
      <p>Post: {router.query.page}</p>
      <div dangerouslySetInnerHTML={{ __html: htmlText }} />
    </div>
  );
}
