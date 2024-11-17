import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useSubmitTweet } from "@/hooks/useContract";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionModal = ({ isOpen, onClose }: SubmissionModalProps) => {
  const { address } = useAccount();
  const toast = useToast();
  const { submitTweet, isLoading } = useSubmitTweet();

  const [tweetLink, setTweetLink] = useState("");
  const [competitionType, setCompetitionType] = useState("0"); // 0 for BUILD_ON_LINEA, 1 for LIFE_ON_LINEA

  const handleSubmit = async () => {
    try {
      if (!address) {
        toast({
          title: "Error",
          description: "Please connect your wallet first",
          status: "error",
        });
        return;
      }

      await submitTweet(tweetLink, parseInt(competitionType));
      
      toast({
        title: "Success",
        description: "Your submission has been recorded!",
        status: "success",
      });
      
      onClose();
      setTweetLink("");
      setCompetitionType("0");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Submission failed",
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Submit Your Entry</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Tweet Link</FormLabel>
              <Input
                value={tweetLink}
                onChange={(e) => setTweetLink(e.target.value)}
                placeholder="https://twitter.com/..."
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Competition Type</FormLabel>
              <Select
                value={competitionType}
                onChange={(e) => setCompetitionType(e.target.value)}
              >
                <option value="0">Build on Linea</option>
                <option value="1">Life on Linea</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Connected Wallet</FormLabel>
              <Input value={address || ""} isReadOnly />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
