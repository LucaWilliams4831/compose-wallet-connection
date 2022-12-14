import { ReactNode } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import Loader from './Loader'
import Emoji from './Emoji'

function WalletLoader({
  children,
  loading = false,
}: {
  children: ReactNode
  loading?: boolean
}) {
  const {
    walletAddress,
    loading: clientLoading,
    error,
    connectWallet,
  } = useSigningClient()

  if (loading || clientLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    )
  }

  if (walletAddress === '') {
    return (
      <div className="max-w-full">
        <h1 className="text-4xl font-bold">
          Welcome to
        </h1>
        <h1 className="mt-4 text-6xl font-bold">
          <Emoji label="dog" symbol="🐶" />
          <span>{' Compose Wallet Connection '}</span>
          <Emoji label="dog" symbol="🐶" />
        </h1>

        <p className="mt-6 text-2xl">
          Get started by installing{' '}
          <a
            className="pl-1 link link-primary link-hover"
            href="https://keplr.app/"
          >
            Keplr wallet
          </a>
        </p>

        <div className="flex flex-wrap items-center justify-around md:max-w-4xl mt-8 sm:w-full">
          <button
            className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus"
            onClick={connectWallet}
          >
            <h3 className="text-2xl font-bold">
              <span className="pr-4">Connect your wallet &rarr;</span>
              <Emoji label="poodle" symbol="🐩" />
            </h3>
          </button>
        </div>
      </div>
    )
  }

  if (error) {
    return <code>{JSON.stringify(error)}</code>
  }

  return <>{children}</>
}

export default WalletLoader
