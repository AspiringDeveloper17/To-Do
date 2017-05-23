import React,{Component} from 'react';

import{
} from 'react-native';

import {Scene,Router} from 'react-native-router-flux';

import Login from './components/login';
import Register from './components/register';
import Home from './components/home';

export default class Main extends Component{
  render(){
    return(
      <Router>
        <Scene key="root" >
        <Scene key="login" component={Login} title="Login Mate" />
        <Scene key="register" component={Register} title="Register Mate"/>
        <Scene key="home" component={Home} title="To-do List"  initial/>
        </Scene>
      </Router>


    );
  }
}
