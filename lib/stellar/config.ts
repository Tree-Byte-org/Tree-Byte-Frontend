export const STELLAR_NETWORK = 'testnet' as const;

export const STELLAR_CONFIG = {
  testnet: {
    horizonURL: 'https://horizon-testnet.stellar.org',
    friendbotURL: 'https://friendbot.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015',
  },
  mainnet: {
    horizonURL: 'https://horizon.stellar.org',
    friendbotURL: '',
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
  },
}[STELLAR_NETWORK];
