type Config = {
    [key: number]: {
        nft: {
            address: `0x${string}`;
        };
        lineaCompetition?: {
            address: `0x${string}`;
        };
    };
};

export const addresses: Config = {
    "5": {
        "nft": {
            "address": "0xcaa8aa6733cff9a916b931e34b2cb817193bfb19"
        }
    },
    "11155111": { // Linea Mainnet
        "nft": {
            "address": "0x3cbd07b8bc7414b7550a434d901f7e92c63647b2"
        },
        "lineaCompetition": {
            "address": "0x3cbd07b8bc7414b7550a434d901f7e92c63647b2" // Replace with your deployed contract address
        }
    }
}
