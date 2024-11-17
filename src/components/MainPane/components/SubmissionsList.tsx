import { useEffect, useState } from "react";
import {
  SimpleGrid,
  Box,
  Text,
  Link,
  Badge,
  VStack,
  Skeleton,
  Image,
  Select,
  Flex
} from "@chakra-ui/react";
import { useGetAllSubmissions } from "@/hooks/useContract";
import { Submission } from "@/types/submission";

// Tweet Preview Component
const TweetPreview = ({ tweetLink }: { tweetLink: string }) => {
  const [preview, setPreview] = useState<{
    text: string | null;
    image: string | null;
  }>({ text: null, image: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTweetPreview = async () => {
      try {
        const tweetId = tweetLink.split('/status/')[1]?.split('?')[0];
        if (!tweetId) return;

        const response = await fetch(`/api/tweet-preview?id=${tweetId}`);
        const data = await response.json();

        if (data.error) {
          console.error('Tweet preview error:', data.error);
          return;
        }

        setPreview({
          text: data.text || null,
          image: data.image || null
        });
      } catch (error) {
        console.error('Failed to fetch tweet preview:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTweetPreview();
  }, [tweetLink]);

  if (isLoading) {
    return <Skeleton height="100px" />;
  }

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="md" 
      p={3} 
      bg="gray.50"
      mt={2}
    >
      {preview.image && (
        <Image
          src={preview.image}
          alt="Tweet media"
          borderRadius="md"
          mb={2}
          maxH="200px"
          objectFit="cover"
        />
      )}
      {preview.text && (
        <Text 
          fontSize="sm" 
          color="gray.600"
          noOfLines={4}
          minH="5em"
          overflow="hidden"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: '4',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {preview.text}
        </Text>
      )}
    </Box>
  );
};

// Main SubmissionsList Component
export const SubmissionsList = () => {
  const { submissions, isLoading } = useGetAllSubmissions();
  const [filter, setFilter] = useState<string>("all");

  const filteredSubmissions = (submissions as Submission[]).filter((submission) => {
    if (filter === "all") return true;
    return submission.competitionType.toString() === filter;
  });

  if (isLoading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height="200px" />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <Box>
      {/* Filter Dropdown */}
      <Flex justifyContent="flex-end" mb={4}>
        <Select 
          width="200px" 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          bg="white"
          _hover={{ borderColor: "blue.500" }}
        >
          <option value="all">All Submissions</option>
          <option value="0">Build on Linea</option>
          <option value="1">Life on Linea</option>
        </Select>
      </Flex>

      {/* Submissions Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredSubmissions.map((submission: Submission, index: number) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            _hover={{ shadow: "lg" }}
            transition="all 0.3s"
            bg="white"
          >
            <VStack align="stretch" spacing={3}>
              {/* Tweet Link */}
              <Link 
                href={submission.tweetLink} 
                isExternal 
                color="blue.500"
                fontWeight="medium"
              >
                View Tweet
              </Link>

              {/* Tweet Preview */}
              <TweetPreview tweetLink={submission.tweetLink} />

              {/* Submission Info */}
              <VStack align="stretch" spacing={2}>
                <Text fontSize="sm" color="gray.600">
                  Submitted by: {submission.submitter.slice(0, 6)}...
                  {submission.submitter.slice(-4)}
                </Text>

                <Text fontSize="sm" color="gray.500">
                  Submitted on: {new Date(Number(submission.timestamp) * 1000).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
              </VStack>

              {/* Badges */}
              <Flex gap={2} flexWrap="wrap">
                <Badge 
                  colorScheme={submission.competitionType === 0 ? "purple" : "green"}
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  {submission.competitionType === 0 ? "Build on Linea" : "Life on Linea"}
                </Badge>

                {submission.isWinner && (
                  <Badge 
                    colorScheme="yellow"
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    Winner! 🏆
                  </Badge>
                )}
              </Flex>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
