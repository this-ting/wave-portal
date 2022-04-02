import React, { useState, useEffect } from 'react'

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState('')

  useEffect(() => {
    checkIfWalletIsConnecterd()
  }, [])

  const checkIfWalletIsConnecterd = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log('no eth')
      } else {
        console.log('we have eth obj', ethereum)
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('found an authorized account: ', account)
        setCurrentAccount(account)
      } else {
        console.log('No authorized account found')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('Get Metamask')
        return
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('connected!', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there!</div>
        <div className="bio">
          I am ting! Connect your Ethereum wallet and wave at me!
        </div>
        <button className="waveButton" onClick={null}>
          Wave at Me
        </button>
        {!currentAccount && (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </div>
  )
}
