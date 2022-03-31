const main = async () => {
  const signers = await hre.ethers.getSigners()
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')
  const waveContract = await waveContractFactory.deploy()
  await waveContract.deployed()

  const owner = signers[0]
  signers.shift()
  const peopleInLineToWave = signers

  console.log('Contract deployed to:', waveContract.address)
  console.log('Contract deployed by:', owner.address)

  let waveCount
  waveCount = await waveContract.getTotalWaves()

  let waveTxn = await waveContract.wave()
  await waveTxn.wait()

  waveCount = await waveContract.getTotalWaves()

  console.log(
    `There are ${peopleInLineToWave.length} people in line to wave! Let's get wavin'`
  )

  for (const person of peopleInLineToWave) {
    waveTxn = await waveContract.connect(person).wave()
    await waveTxn.wait()

    waveCount = await waveContract.getTotalWaves()
  }
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

runMain()
