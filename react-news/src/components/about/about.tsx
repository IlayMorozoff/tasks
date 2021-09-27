import { FC } from 'react';
import './about.css';

const About: FC = () => {
  return (
    <div className="text__about">
      This is a news aggregator where you can search for news in any language, but unfortunately
      only provide 100 news for free, or 100 API requests, if you want more, connect to the tariff
      plan.
    </div>
  );
};

export default About;
