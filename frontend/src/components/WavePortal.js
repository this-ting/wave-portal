import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import abi from '../utils/WavePortal.json'

export default function WavePortal() {
  const [currentAccount, setCurrentAccount] = useState('')
  const contractAddress = '0x6899c5F234bffF8fD0b7AeF626b41F22796B9920'
  const contractABI = abi.abi

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

  const wave = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        let count = await wavePortalContract.getTotalWaves()
        console.log('The total retrieved wave count is: ', count.toNumber())

        const waveTxn = await wavePortalContract.wave()
        console.log('Mining...', waveTxn.hash)

        await waveTxn.wait()
        console.log('Mined --', waveTxn.hash)

        count = await wavePortalContract.getTotalWaves()
        console.log('The updatd wave count is ', count.toNumber())
      } else {
        console.log("Ethereum object doesn't exist!")
      }
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
        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        {!currentAccount && (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
    </div>
  )
}
