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
    "59144": {
        "nft": {
            "address": "0x5ad2a373d7e261e1570021548de454ccf7eecd6c"
        },
        "lineaCompetition": {
            "address": "0x5ad2a373d7e261e1570021548de454ccf7eecd6c" // Replace with your deployed contract address
        }
    },
    "59141": { // Linea Mainnet
        "nft": {
            "address": "0x8d98aef8cfd8f1808421437528a0ed6c90608861"
        },
        "lineaCompetition": {
            "address": "0x8d98aef8cfd8f1808421437528a0ed6c90608861" // Replace with your deployed contract address
        }
    }
}
