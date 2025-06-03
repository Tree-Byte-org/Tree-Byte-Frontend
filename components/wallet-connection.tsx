"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Shield, Zap, CheckCircle, ArrowRight } from "lucide-react"

interface WalletConnectionProps {
  onConnect: (connected: boolean) => void
  isConnected: boolean
  onNext: () => void
}

export function WalletConnection({ onConnect, isConnected, onNext }: WalletConnectionProps) {
  const [connecting, setConnecting] = useState(false)

  const handleConnect = async () => {
    setConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      onConnect(true)
      setConnecting(false)
    }, 2000)
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🔗 2. Connect your wallet</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Click "Connect" to link your Stellar-compatible wallet. It's fast, secure and necessary to receive your NFT.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Wallet className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Connect Stellar Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isConnected ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4">
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Secure</h3>
                    <p className="text-sm text-gray-600">Latest generation blockchain technology</p>
                  </div>
                  <div className="p-4">
                    <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Fast</h3>
                    <p className="text-sm text-gray-600">Instant and economical transactions</p>
                  </div>
                  <div className="p-4">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Verified</h3>
                    <p className="text-sm text-gray-600">Each NFT is backed by a real tree</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Why Stellar?</h4>
                  <p className="text-sm text-blue-700">
                    Stellar is a fast and low-cost blockchain network, perfect for environmental impact projects like
                    Tree Byte. Its focus on financial inclusion and sustainability makes it ideal for global tree
                    adoption initiatives.
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleConnect}
                  disabled={connecting}
                >
                  {connecting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By connecting your wallet, you accept our terms of service and privacy policy.
                </p>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-600">Wallet connected successfully!</h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Address:</strong> 0x1234...5678
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Network:</strong> Stellar Mainnet
                  </p>
                </div>
                <Button size="lg" onClick={onNext} className="bg-green-600 hover:bg-green-700">
                  Continue with adoption
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
