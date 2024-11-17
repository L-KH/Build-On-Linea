import { Alert, AlertIcon, AlertTitle, AlertDescription, Button, VStack } from '@chakra-ui/react';
import { useAccount, useChainId, useConfig } from 'wagmi';

export const NetworkCheck = ({ children }: { children: React.ReactNode }) => {
  const chainId = useChainId();
  const config = useConfig();
  const { isConnected } = useAccount();
  
  // Array of allowed chain IDs
  const ALLOWED_CHAIN_IDS = [
    59144,  // Linea Mainnet
    59141   // Linea Testnet
  ];

  const switchNetwork = async (targetChainId: number) => {
    if (!window.ethereum) {
      alert('Please install MetaMask or another web3 wallet');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
    } catch (switchError: { code: number } | any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${targetChainId.toString(16)}`,
                chainName: targetChainId === 59144 ? 'Linea Mainnet' : 'Linea Testnet',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: [targetChainId === 59144 
                  ? 'https://rpc.linea.build' 
                  : 'https://rpc.goerli.linea.build'],
                blockExplorerUrls: [targetChainId === 59144 
                  ? 'https://lineascan.build' 
                  : 'https://goerli.lineascan.build'],
              },
            ],
          });
        } catch (addError: unknown) {
          console.error('Error adding network:', addError);
        }
      }
      console.error('Error switching network:', switchError);
    }
  };

  if (!isConnected) {
    return <>{children}</>;
  }

  if (!ALLOWED_CHAIN_IDS.includes(chainId)) {
    return (
      <Alert
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        borderRadius="lg"
        bg="orange.50"
        p={8}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Wrong Network Detected
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          <VStack spacing={3}>
            <AlertDescription>
              Please connect to Linea Mainnet or Testnet to participate in the competition.
              {chainId && (
                <strong style={{ display: 'block', marginTop: '8px' }}>
                  Current network: {config.chains.find(c => c.id === chainId)?.name || 'Unknown'}
                </strong>
              )}
            </AlertDescription>
            <VStack spacing={2} width="100%">
              <Button
                colorScheme="blue"
                onClick={() => switchNetwork(59144)}
                size="md"
                width="full"
              >
                Switch to Linea Mainnet
              </Button>
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => switchNetwork(59141)}
                size="md"
                width="full"
              >
                Switch to Linea Testnet
              </Button>
            </VStack>
          </VStack>
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};
