import { FC } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import About from '../about/about';
import DetailsNews from '../details-news/details-news';
import Error404 from '../Error404/Error404';
import Header from '../header/header';
import HomePage from '../home-page/home-page';
import './app.css';

export const App: FC = () => {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: {
      opacity: 0,
      transform: 'translateX(100%)',
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0%)',
    },
    leave: {
      opacity: 0,
      transform: 'translateX(-100%)',
    },
  });

  return (
    <>
      <Header />
      {transitions((props, item) => (
        <animated.div style={props}>
          <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <Switch location={item}>
              <Route path="/" exact component={HomePage} />
              <Route path="/about" exact component={About} />
              <Route path="/details/:title" exact component={DetailsNews} />
              <Route component={Error404} />
            </Switch>
          </div>
        </animated.div>
      ))}
    </>
  );
};

export default App;
