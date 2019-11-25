import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect} from 'react-router-dom'


const withCheckLogin = (Wrappedcomponent) => {
  const newComponent = class extends Component {

    render() {
      const {location,token,...rest} = this.props

      if(location.pathname === '/login'){
        if(token){
          return <Redirect to='/' />
        }
      }else {
        if(!token){
          return <Redirect to='/login' />
        }
      }
      return <Wrappedcomponent {...rest} location={location} />
    }
  }


  return connect(state => ({token: state.user.token}),null)(newComponent)
}

export default withCheckLogin
