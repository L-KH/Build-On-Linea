"use client";
import { type FC } from "react";

import { HStack, Heading, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

import { useWindowSize } from "@/hooks/useWindowSize";

import logo from "../../../public/img/logo_transparent.png";
import { DarkModeButton } from "../DarkModeButton";

const Header: FC = () => {
  const { isTablet } = useWindowSize();

  return (
    <HStack
      as="header"
      p={"1.5rem"}
      position="sticky"
      top={0}
      zIndex={10}
      justifyContent={"space-between"}
    >
      <HStack>
        <Image src={logo.src} alt="logo" width={55} height={55} />
        {!isTablet && (
          <Heading as="h1" fontSize={"1.5rem"} className="text-shadow">
          Linea Weekly Contests
          <Text fontSize="0.8rem" color="gray.500" ml={1}>
          Life on Linea

          </Text>
          <Text fontSize="0.8rem" color="gray.500" ml={1}>
          Build on Linea

          </Text>
        </Heading>
        )}
      </HStack>

      <HStack>
        <ConnectButton />
        <DarkModeButton />
      </HStack>
    </HStack>
  );
};

export default Header;
