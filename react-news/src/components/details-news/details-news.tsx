import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './details-news.css';
import defaultImg from '../../assets/default-image.jpg';
import { IArticle } from '../interfaces';
import Loader from '../loader/loader';
import newsApi from '../../services/news-service/news-service';

const DetailsNews: FC = () => {
  const { title }: { title: string } = useParams();
  const [article, setArticle] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    newsApi.getNews(title, '1', '100', 'publishedAt').then((articleServ) => {
      setArticle(articleServ);
      setIsLoading(false);
    });
  }, [title]);

  const DetailsContainer = () => {
    return (
      <section className="details" data-testid="details">
        <h1 className="title_details">{article[0].title}</h1>
        <h2 className="autor_details">By: {article[0].author || 'Unknown'}</h2>
        <div className="content_details">
          <div className="image_wrapper_details">
            <img
              className="image_details"
              src={article[0].urlToImage || defaultImg}
              alt="something news"
            />
          </div>
          <div className="content_wrap_details">
            <div className="discription_details">{article[0].description}</div>
            <div className="content_details"> {article[0].content}</div>
            <div className="read__more_details">
              <a
                href={article[0].url}
                target="_blank"
                rel="noreferrer"
                className="button read_details"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };
  const loader = isLoading ? <Loader /> : <DetailsContainer />;
  return <div>{loader}</div>;
};

export default DetailsNews;
