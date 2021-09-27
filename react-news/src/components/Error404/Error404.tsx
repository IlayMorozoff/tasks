import { Link } from 'react-router-dom';
import { FC } from 'react';
import './Error404.css';
import ErrorImg from '../../assets/error404.png';

const Error404: FC = () => {
  return (
    <div className="error404">
      <div className="something">Something went wrong</div>
      <div className="img__wrapper">
        <img className="img__error" src={ErrorImg} alt="404" />
      </div>
      <div className="text__error">Page Not Found</div>
      <div className="back">
        <Link to="/" className="back_link button" data-testid="goHome">
          Go back to the Home page
        </Link>
      </div>
    </div>
  );
};

export default Error404;
