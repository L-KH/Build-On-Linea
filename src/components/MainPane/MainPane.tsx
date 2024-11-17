import { type FC } from "react";
import { Box, VStack, Heading, Text, Button, useDisclosure, Center } from "@chakra-ui/react";
import styles from "@/styles/mainPane.module.css";
import { SubmissionModal } from "./components/SubmissionModal";
import { SubmissionsList } from "./components/SubmissionsList";
import { motion } from "framer-motion"; // Add framer-motion for animations
const MainPane: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={6} className={styles.mainContainer}>
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

      {/* Submission Modal */}
      <SubmissionModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default MainPane;
