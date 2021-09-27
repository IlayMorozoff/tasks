import { FC } from 'react';
import './errorFetch.css';

const ErrorFetch: FC = () => {
  return (
    <div className="wrapper_error">
      <div className="error__fetch__title">The list of articles is empty</div>
      <div className="error__fetch__title">
        No news was found for this request or the API requests limit is being searched
      </div>
      <div className="error__fetch">
        To get articles, you need to fill in the fields News per Page (the number of pages displayed
        on one page), Go to the page( the page you want to go to, subsequent page switching can be
        performed using the Prev and Next buttons), you also need to select the sort by which you
        would like to display articles, and enter keywords in the search bar and press Enter or the
        Search button
      </div>
    </div>
  );
};

export default ErrorFetch;
