import { useRouter } from 'next/router';
import { unified } from 'unified';

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <p>Post: {router.query.page}</p>
    </div>
  );
}
