import React from 'react'
import {Navigate, Outlet}from 'react-router-dom';
import { isauthenticated } from './Services';

export default function Auth() {
  return (
    isauthenticated() ? <Outlet/>:<Navigate to="/"/>
  )
};