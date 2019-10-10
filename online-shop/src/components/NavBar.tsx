import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import iconPage from '../icon.png';
import '../productModeling/navBar.css'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faCamera,faShoppingCart } from '@fortawesome/free-solid-svg-icons'

library.add(faCamera,faShoppingCart)



export default class NavBar extends React.Component{
    render(){
        return(
            <nav className="navbar is-primary">
  <div className="navbar-brand">
    <Link to= '/products'>
        <div className='nav-logo'>
             <a className="navbar-item" >
                <img src={iconPage} alt="nav image"/>
               <p className='subtitle is-4'>Online shop</p>
            </a>
        </div>
    </Link>
  </div>
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="field is-grouped">
          <p className="control">
          <Link to ='/cart' className='ml-auto'>
            <a className="button is-primary" >
              <span className="icon">
              <FontAwesomeIcon icon='shopping-cart' color='#ddd'/>
              </span>
              <span>Cart</span>
            </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
</nav>
        );
    }
}

