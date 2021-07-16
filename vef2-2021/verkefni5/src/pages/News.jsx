import { useParams } from 'react-router-dom';
import { News } from '../components/news/News'

export function NewsPage() {
  // TODO útfæra fréttasíðu
  let { id } = useParams();
  return (
    <div>
      <News newsid={id} />
    </div>
  );
}
