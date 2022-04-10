import React from 'react'
import ReactDOM from 'react-dom'
import { ChainId, Config, DAppProvider } from '@usedapp/core'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ETH_MAINNET_KEY } from './global/apiKeys';
import App from './App';

const config:Config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: ETH_MAINNET_KEY,
    // [ChainId.Hardhat]: 'http://127.0.0.1:8545/'
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
