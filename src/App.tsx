import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { formatEther } from '@ethersproject/units'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router'
import { Page } from './components/base/base';
import { TopBar } from './components/TopBar';
import { DashBoardPage } from './pages/Dashboard';
import { NotificationsList } from './components/transactions/History';

function App() {
  return (

  <Page>
  <BrowserRouter>
    <TopBar />
    <Routes>
      <Route path="/" element={<DashBoardPage />}/>
      <Route path="*" element={<DashBoardPage />}/>    
    </Routes>
  </BrowserRouter>
  <NotificationsList />
</Page>
  );
}

export default App;
