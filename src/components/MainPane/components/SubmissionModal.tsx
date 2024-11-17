// components/SubmissionModal.tsx
import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Text,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';
import { useSubmitTweet } from '@/hooks/useContract';
import { isValidTwitterUrl } from '@/utils/urlValidator';
import { useAccount } from 'wagmi';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionModal = ({ isOpen, onClose }: SubmissionModalProps) => {
  const [tweetLink, setTweetLink] = useState('');
  const [competitionType, setCompetitionType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlError, setUrlError] = useState('');
  const { submitTweet } = useSubmitTweet();
  const { address } = useAccount();
  const toast = useToast();

  const validateUrl = (url: string) => {
    if (!url) {
      setUrlError('Tweet URL is required');
      return false;
    }
    
    if (!isValidTwitterUrl(url)) {
      setUrlError('Please enter a valid Twitter/X.com tweet URL');
      return false;
    }
    
    setUrlError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet first',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    if (!validateUrl(tweetLink)) {
      return;
    }

    if (!competitionType) {
      toast({
        title: 'Error',
        description: 'Please select a competition type',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await submitTweet(tweetLink, parseInt(competitionType));
      
      toast({
        title: 'Success!',
        description: 'Your tweet has been submitted successfully',
        status: 'success',
        duration: 5000,
      });
      
      onClose();
      setTweetLink('');
      setCompetitionType('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit tweet. Please try again.',
        status: 'error',
        duration: 5000,
      });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Submit Your Tweet</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!urlError}>
                <FormLabel>Tweet URL</FormLabel>
                <Input
                  placeholder="https://twitter.com/user/status/123..."
                  value={tweetLink}
                  onChange={(e) => {
                    setTweetLink(e.target.value);
                    validateUrl(e.target.value);
                  }}
                />
                <FormErrorMessage>{urlError}</FormErrorMessage>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Please enter a valid Twitter/X.com tweet URL
                </Text>
              </FormControl>

              <FormControl>
                <FormLabel>Competition Type</FormLabel>
                <Select
                  placeholder="Select competition type"
                  value={competitionType}
                  onChange={(e) => setCompetitionType(e.target.value)}
                >
                  <option value="0">Build on Linea</option>
                  <option value="1">Life on Linea</option>
                </Select>
              </FormControl>

              <Text fontSize="sm" color="gray.600">
                Address: {address ? 
                  `${address.slice(0, 6)}...${address.slice(-4)}` : 
                  'Please connect your wallet'}
              </Text>

              <Button
                colorScheme="blue"
                width="full"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Submitting..."
                disabled={!address}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
