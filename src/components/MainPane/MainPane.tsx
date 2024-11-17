import { type FC } from "react";
import { Box, VStack, Heading, Text, Button, useDisclosure, Center } from "@chakra-ui/react";
import styles from "@/styles/mainPane.module.css";
import { SubmissionModal } from "./components/SubmissionModal";
import { SubmissionsList } from "./components/SubmissionsList";
import { motion } from "framer-motion"; // Add framer-motion for animations
import { NetworkCheck } from '@/components/NetworkCheck';




const MainPane: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={6} className={styles.mainContainer}>
      <NetworkCheck>
      <VStack spacing={8} align="center"> {/* Changed to center alignment */}
        {/* Competition Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Center textAlign="center">
            <VStack spacing={4}>
              <Heading 
                as="h1" 
                size="xl" 
                mb={4}
                className={styles.glowingText}
              >
                Linea Community Competition
              </Heading>
              <Text 
                fontSize="lg" 
                mb={6}
                maxW="800px"
              >
                Join the Linea community competition and showcase your contributions! 
                Choose between two exciting categories:
              </Text>
              <VStack spacing={4} mb={6}>
                <Text>
                  🏗️ <strong>Build on Linea</strong>: Share your development projects, 
                  tools, or infrastructure contributions.
                </Text>
                <Text>
                  ⭐ <strong>Life on Linea</strong>: Show how you're using Linea in 
                  your daily crypto activities.
                </Text>
                <Text 
                  fontSize="md" 
                  color="blue.500" 
                  cursor="pointer" 
                  _hover={{ textDecoration: 'underline' }}
                  onClick={() => window.open('https://linea.mirror.xyz/S1kX0o2i3J-fX0pEsu5S2gD4Hkwj3Be5JwjXvExaydo', '_blank')}
                >
                  📚 Click here to learn more about the competition details
                </Text>
              </VStack>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  colorScheme="blue" 
                  size="lg" 
                  onClick={onOpen}
                  mb={8}
                  className={styles.glowButton}
                >
                  Submit Your Entry
                </Button>
              </motion.div>
            </VStack>
          </Center>
        </motion.div>

        {/* Divider */}
        <Box 
          borderBottom="2px" 
          borderColor="gray.200" 
          my={8} 
        />

        {/* Submissions List */}
        <Box>
          <Heading as="h2" size="lg" mb={6}>
            Community Submissions
          </Heading>
          <SubmissionsList />
        </Box>
      </VStack>
      </NetworkCheck>
      {/* Submission Modal */}
      <SubmissionModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default MainPane;
