"use client";
import React, { useEffect, useState } from "react";

import {
  Button,
  Input,
  HStack,
  VStack,
  Spinner,
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";

import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { formatEther } from "viem";
import { useAccount, useBalance, useBlockNumber } from "wagmi";
import { apiUrlMap } from "@/constants/config";
import { useMint } from "@/hooks/WriteContract";
import {
  uploadImage,
  uploadFallbackImage,
} from "@/services/ipfsUploader";
import { getMagicPrompt, createImageWithDALLE, createImage, createImageWithEdenAI, generateImageReplicate } from '@/services/openaiService'
import "react-toastify/dist/ReactToastify.css";

const MintPage = () => {
  const { address, isDisconnected } = useAccount();
  const { handleMint } = useMint();
  const logoUrl = "https://raw.githubusercontent.com/L-KH/ARB-Airdrop-Checker/main/ImaginAIry_NFTs.png";
  const [isOpen, setIsOpen] = useState(false);
  const [txError, setTxError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMint, setIsLoadingMint] = useState(false);
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isConfirmedTx, setIsConfirmedTx] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [txHash, setTxHash] = useState("");
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("EdenAI");
  const [image, setImage] = useState(logoUrl);
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState(`0x${"0".repeat(40)}`);
  const { data: balance, queryKey } = useBalance({ address: account as `0x${string}` });

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber, queryClient, queryKey]);

  useEffect(() => {
    if (address) {
      setAccount(address);
    }
  }, [address]);

  const handleGeneratePrompt = async () => {
    setIsLoadingPrompt(true);
    const generate = await getMagicPrompt(prompt);
    setPrompt(generate);
    setIsLoadingPrompt(false);
  };
  class ApiError extends Error {
    constructor(public status: number, message: string) {
      super(message);
      this.name = 'ApiError';
    }
  }
  
  const handleGenerateImage = async () => {
    try {
      setIsLoading(true);
      let imageSrc = null;
  
      if (selectedModel === "EdenAI" || !imageSrc) {
        imageSrc = await createImageWithEdenAI(prompt);
      }
  
      if (!imageSrc && (selectedModel === "DALLE" || !imageSrc)) {
        const base64Image = await createImageWithDALLE(prompt);
        if (base64Image) {
          imageSrc = `data:image/png;base64,${base64Image}`;
        }
      }
  
      if (!imageSrc) {
        const data = await createImage(apiUrlMap[selectedModel], prompt);
        imageSrc = data?.image;
      }
  
      if (imageSrc) {
        setImage(imageSrc);
      } else {
        throw new Error("Failed to generate image with all available models.");
      }
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred while generating the image.");
      setImage(logoUrl);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handleMintImage = async () => {
    try {
      setIsLoadingUpload(true);
      setIsLoadingMint(true);
      setIsConfirmedTx("loading");
      const url =
        image === logoUrl
          ? await uploadFallbackImage(logoUrl)
          : await uploadImage(image, name, description);
      setIsLoadingUpload(false);
      const hash = await handleMint(url);
      if (!hash) throw new Error("Failed to approve token A");
      setTxHash(hash);
      setIsLoadingMint(true);
      setIsConfirmedTx("success");
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.toString());
      } else if (typeof error === "string") {
        setErrorMsg(error);
      } else {
        setErrorMsg("An unknown error occurred");
      }
      setIsLoadingMint(false);
      setTxError(true);
      setIsConfirmedTx("rejected");
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
  };

  const changeModel = (modelName: string) => {
    setSelectedModel(modelName);
  };

  return (
    <Box p={10}>
      <ToastContainer />
      <VStack spacing={16}>
        <HStack spacing={4} alignItems="center" justifyContent="center">
          {true && (
            <Box
              display={{ base: "block", md: "flex" }}
              alignItems="center"
              justifyContent="center"
              width="full"
            >
              <Box
                borderWidth={1}
                borderColor="gray.300"
                shadow="lg"
                rounded="lg"
                overflow="hidden"
                aspectRatio={1}
                maxW={{ base: "90vw", md: "md", lg: "lg", xl: "xl" }}
                minW="150px"
                minH="150px"
                w="full"
                h="auto"
                marginX="auto"
              >
                {isLoading ? (
                  <Box position="relative" w="full" h="full">
                    <Image
                      src={image}
                      alt="Generated"
                      objectFit="cover"
                      rounded="lg"
                      opacity={0.4}
                      w="full"
                      h="full"
                    />
                    <Spinner
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      color="blue.500"
                    />
                  </Box>
                ) : (
                  <Image
                    src={image}
                    alt="Generated"
                    objectFit="cover"
                    rounded="lg"
                    w="full"
                    h="full"
                  />
                )}
              </Box>
            </Box>
          )}
          <VStack
            w="full"
            maxW="md"
            p={6}
            rounded="lg"
            shadow="md"
            spacing={4}
          >
            <Box w="full">
              <Text mb={2} fontWeight="bold" fontSize="sm">
                Choose AI Model
              </Text>
              <Select
                value={selectedModel}
                onChange={(e) => changeModel(e.target.value)}
                variant="filled"
              >
                {Object.entries(apiUrlMap).map(([modelKey]) => (
                  <option key={modelKey} value={modelKey}>
                    {modelKey.replace(/-/g, " ").replace(/\b\w/g, (letter) =>
                      letter.toUpperCase()
                    )}
                  </option>
                ))}
              </Select>
            </Box>
            <Box w="full">
              <Text mb={2} fontWeight="bold" fontSize="sm">
                Name
              </Text>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter image name"
              />
            </Box>
            <Box w="full">
              <Text mb={2} fontWeight="bold" fontSize="sm">
                NFT description
              </Text>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="NFT description"
              />
            </Box>
            <Box w="full">
              <Text mb={2} fontWeight="bold" fontSize="sm">
                Prompt
              </Text>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter prompt or generate using AI"
              />
            </Box>
            <HStack spacing={2}>
              <Button
                isLoading={isLoadingPrompt}
                onClick={handleGeneratePrompt}
                colorScheme="blue"
                cursor="not-allowed"
                disabled
              >
                Generate Prompt
              </Button>
              <Button
                isLoading={isLoading}
                onClick={handleGenerateImage}
                colorScheme="green"
              >
                Generate Image
              </Button>
            </HStack>
            <Button
              disabled={isDisconnected || parseFloat(formatEther(balance?.value || BigInt(0))) < 0.001}
              onClick={() => {
                setIsOpen(true);
                handleMintImage();
              }}
              colorScheme="purple"
            >
              {isDisconnected
                ? "Connect Your Wallet"
                : parseFloat(formatEther(balance?.value || BigInt(0))) < 0.001
                ? "Insufficient balance"
                : "Mint NFT"}
            </Button>
          </VStack>
        </HStack>
      </VStack>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mint Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isConfirmedTx === "loading" ? (
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Box flex="1">
                    <Text fontWeight="bold">Upload Image to IPFS</Text>
                  </Box>
                  {isLoadingUpload ? (
                    <Spinner color="green.500" />
                  ) : !txError ? (
                    <CheckIcon color="green.500" />
                  ) : (
                    <CloseIcon color="red.500" />
                  )}
                </HStack>
                <HStack>
                  <Box flex="1">
                    <Text fontWeight="bold">Mint NFT</Text>
                  </Box>
                  {isLoadingMint ? (
                    <Spinner color="green.500" />
                  ) : !txError ? (
                    <CheckIcon color="green.500" />
                  ) : (
                    <CloseIcon color="red.500" />
                  )}
                </HStack>
              </VStack>
            ) : isConfirmedTx === "success" ? (
              <VStack spacing={4} align="stretch">
                <Text fontWeight="bold">Mint successful</Text>
                <Text>
                  Your unique AI-generated image is now successfully minted
                </Text>
                <Text>Transaction ID: {txHash}</Text>
              </VStack>
            ) : (
              <VStack spacing={4} align="stretch">
                <Text fontWeight="bold" color="red.500">
                  Transaction Failed
                </Text>
                <Text>{errorMsg}</Text>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MintPage;