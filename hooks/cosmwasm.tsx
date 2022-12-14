import { useState } from 'react'
import { connectKeplr } from 'services/keplr'
import { SigningCosmWasmClient, CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

export interface ISigningCosmWasmClientContext {
  walletAddress: string
  client: CosmWasmClient | null
  signingClient: SigningCosmWasmClient | null
  loading: boolean
  error: any
  connectWallet: any
  disconnect: Function
}

const PUBLIC_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''
const PUBLIC_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

export const useSigningCosmWasmClient = (): ISigningCosmWasmClientContext => {
  const [client, setClient] = useState < CosmWasmClient | null > (null)
  const [signingClient, setSigningClient] =
    useState < SigningCosmWasmClient | null > (null)
  const [walletAddress, setWalletAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const connectWallet = async () => {
    // setLoading(true)

    try {
      console.log("connectWallet log - 1");

      await connectKeplr()

      console.log("connectWallet log - 2");

      // enable website to access kepler
      await (window as any).keplr.enable(PUBLIC_CHAIN_ID)

      console.log("connectWallet log - 3");

      // get offline signer for signing txs
      const offlineSigner = await (window as any).getOfflineSigner(PUBLIC_CHAIN_ID)

      console.log("connectWallet log - 4 : ", offlineSigner);

      // make client
      setClient(await CosmWasmClient.connect(PUBLIC_RPC_ENDPOINT))

      console.log("connectWallet log - 5");

      // make client
      setSigningClient(
        await SigningCosmWasmClient.connectWithSigner(
          PUBLIC_RPC_ENDPOINT,
          offlineSigner
        )
      )

      // get user address
      const [{ address }] = await offlineSigner.getAccounts()
      console.log("connectWallet log - 6", address);
      setWalletAddress(address)

      // setLoading(false)
    } catch (error) {
      console.log("connectWallet log - err", error);
      setError(error)
    }
  }

  const disconnect = () => {
    if (signingClient) {
      signingClient.disconnect()
    }
    setWalletAddress('')
    setSigningClient(null)
    setLoading(false)
  }

  return {
    walletAddress,
    signingClient,
    loading,
    error,
    connectWallet,
    disconnect,
    client
  }
}
