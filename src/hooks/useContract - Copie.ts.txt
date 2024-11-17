import { useWriteContract, useReadContract, useAccount , useWatchContractEvent} from "wagmi";
import { addresses } from "@/constants/config";
import React, { useEffect, useState } from "react";
import { Submission } from "@/types/submission";

// Define the ABI here since we don't have a separate file
const COMPETITION_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "submitter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tweetLink",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "enum LineaCompetition.CompetitionType",
				"name": "competitionType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "NewSubmission",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "member",
				"type": "address"
			}
		],
		"name": "TeamMemberAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "member",
				"type": "address"
			}
		],
		"name": "TeamMemberRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum LineaCompetition.CompetitionType",
				"name": "competitionType",
				"type": "uint8"
			}
		],
		"name": "WinnerSelected",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_member",
				"type": "address"
			}
		],
		"name": "addTeamMember",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSubmissions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "submitter",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "tweetLink",
						"type": "string"
					},
					{
						"internalType": "enum LineaCompetition.CompetitionType",
						"name": "competitionType",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isWinner",
						"type": "bool"
					}
				],
				"internalType": "struct LineaCompetition.Submission[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSubmissionCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum LineaCompetition.CompetitionType",
				"name": "_competitionType",
				"type": "uint8"
			}
		],
		"name": "getSubmissionsByType",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "submitter",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "tweetLink",
						"type": "string"
					},
					{
						"internalType": "enum LineaCompetition.CompetitionType",
						"name": "competitionType",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isWinner",
						"type": "bool"
					}
				],
				"internalType": "struct LineaCompetition.Submission[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "isTeam",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isTeamMember",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_member",
				"type": "address"
			}
		],
		"name": "removeTeamMember",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_winners",
				"type": "address[]"
			}
		],
		"name": "selectWinners",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "submissions",
		"outputs": [
			{
				"internalType": "address",
				"name": "submitter",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tweetLink",
				"type": "string"
			},
			{
				"internalType": "enum LineaCompetition.CompetitionType",
				"name": "competitionType",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isWinner",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tweetLink",
				"type": "string"
			},
			{
				"internalType": "enum LineaCompetition.CompetitionType",
				"name": "_competitionType",
				"type": "uint8"
			}
		],
		"name": "submitTweet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "submitters",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export const useSubmitTweet = () => {
    const { chain } = useAccount();
    const chainId = chain?.id || 59140; // Default to Linea Mainnet
  
    const contractAddress = addresses[chainId]?.lineaCompetition?.address;
    
    const { writeContractAsync, isPending } = useWriteContract();
  
    const submitTweet = async (tweetLink: string, competitionType: number) => {
      if (!contractAddress) throw new Error("Contract address not found");
      
      try {
        const hash = await writeContractAsync({
          abi: COMPETITION_ABI,
          address: contractAddress,
          functionName: 'submitTweet',
          args: [tweetLink, competitionType],
        });
        return hash;
      } catch (error) {
        console.error('Error submitting tweet:', error);
        throw error;
      }
    };
  
    return { submitTweet, isLoading: isPending };
  };
  
  export const useGetAllSubmissions = () => {
    const { chain } = useAccount();
    const chainId = chain?.id || 59140;
  
    const contractAddress = addresses[chainId]?.lineaCompetition?.address;
  
    const { data, isLoading, refetch } = useReadContract<typeof COMPETITION_ABI, 'getAllSubmissions', Submission[]>({
      abi: COMPETITION_ABI,
      address: contractAddress,
      functionName: 'getAllSubmissions',
    });
  
    // Watch for new submissions
    useWatchContractEvent({
      abi: COMPETITION_ABI,
      address: contractAddress,
      eventName: 'NewSubmission',
      onLogs: () => refetch(),
    });
  
    // Optionally, set up a polling interval
    useEffect(() => {
      const interval = setInterval(() => {
        refetch();
      }, 10000); // Poll every 10 seconds
  
      return () => clearInterval(interval);
    }, [refetch]);
  
    return {
        submissions: data || [] as Submission[],
        isLoading,
      };
  };
  