import React from 'react'
import {Route, Switch,Redirect} from 'react-router-dom'
import {Home} from '../containers'
import QueueAnim from 'rc-queue-anim';
export default(props) => {
  const location = props.history.location;
  const compArray = [
    {
      to: '/home',
      component: Home,
      name: '首页'
    },
    // { to: '/home/resumeorders', component: HomeResumeOrders, name: 'Page1' }, {
    // to: '/home/recruitorders', component: HomeRecruitOrders, name: 'Page2' },
  ];
  const routes = compArray.map(item => {
    if (location.pathname === item.to) {
      return <QueueAnim
        key={location.pathname}
        type={['right', 'left']}
        className="router-wrap">
        <Route
          key={location.pathname}
          exec
          location={location}
          path="/:url"
          component={item.component}/>
      </QueueAnim>
    } else if (location.pathname === '/') {
      return <QueueAnim
        key={location.pathname}
        type={['right', 'left']}
        className="router-wrap">
       <Redirect to="/home"/>
      </QueueAnim>
    }
  })

  return routes
}
