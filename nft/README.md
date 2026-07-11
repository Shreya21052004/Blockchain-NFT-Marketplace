# ⬡ NFT Marketplace — Ethereum (Hardhat + Solidity + IPFS)

This project has been redesigned to use a **real ERC-721 smart contract** deployed to **Ethereum Sepolia testnet**, with **IPFS (Pinata)** for decentralized storage, and a simple **HTML/CSS/JS** frontend that talks to the contract via **MetaMask + ethers.js**.

---

## ✅ What’s Implemented

| Requirement | Implementation | Location |
|---|---|---|
| **User-friendly Interface** | React-free HTML/CSS/JS SPA with drag-drop upload, live search, modals, toasts | `frontend/public/` |
| **Blockchain Integration** | Real Solidity contract on Ethereum (Sepolia/local) | `contracts/NFTMarketplace.sol` |
| **File Hash Identification** | SHA-256 fingerprint generated server-side on upload (also live in browser) | `backend/routes/nfts.js` → `POST /mint` |
| **Ownership Tracking** | ERC-721 ownership on-chain (`ownerOf`, `Transfer` events) | Smart contract + Etherscan |
| **Secure Transactions** | On-chain listing + ETH purchase (`buy()` payable) | `contracts/NFTMarketplace.sol` |
| **Metadata Management** | Token metadata stored on IPFS, referenced by `tokenURI` | `backend/routes/ipfs.js` |
| **Search & Discovery** | Client-side search/filter/sort using on-chain token metadata | `frontend/public/js/app.js` |

---

## 📁 Folder Structure

```
nft/
│
├── contracts/
│   └── NFTMarketplace.sol        ← ERC-721 + listing + buy with ETH
├── scripts/
│   └── deploy.js                 ← Deploy + write ABI/address into frontend
├── test/
│   └── NFTMarketplace.test.js    ← Hardhat tests (mint/list/buy)
├── hardhat.config.js
├── .env.example                  ← Sepolia RPC + deployer key
├── backend/
│   ├── server.js                 ← Express server (serves frontend + IPFS upload API)
│   ├── routes/
│   │   └── ipfs.js               ← Pinata upload (file + metadata → tokenURI)
│   └── .env.example              ← PORT + PINATA_JWT
└── frontend/
  └── public/
    ├── index.html
    ├── css/style.css
    └── js/
      ├── app.js            ← MetaMask + ethers.js contract integration
      ├── contractConfig.js ← Auto-written by deploy script (address/chainId)
      └── abi/NFTMarketplace.json ← Auto-written by deploy script
```

---

## 🚀 Setup & Run (Sepolia)

### 0) Prerequisites

| Tool | Version | Install |
|---|---|---|
| **Node.js** | ≥ 18.x | https://nodejs.org |
| **MetaMask** | Latest | https://metamask.io |
| **Sepolia ETH** | Faucet | https://sepoliafaucet.com (or Alchemy faucet) |

### 1) Install dependencies

```bash
cd d:\blockchain_project_final\nft\nft
npm install
cd backend
npm install
```

This installs:

| Package | Purpose |
|---|---|
| `express` | HTTP server & routing |
| `cors` | Cross-origin request handling |
| `multer` | File upload middleware (memory storage) |
| `uuid` | Generate unique token IDs |
| `express-validator` | Input validation |
| `helmet` | Security headers |
| `express-rate-limit` | Rate limiting for API endpoints |
| `morgan` | HTTP request logging |
| `dotenv` | Environment variable loading |
| `nodemon` *(dev)* | Auto-restart on file changes |

### 2) Configure environment variables

- Smart contract deploy (root): copy `.env.example` → `.env` and set:
  - `SEPOLIA_RPC_URL`
  - `PRIVATE_KEY` (Sepolia-funded account)
- Backend (Pinata): copy `backend/.env.example` → `backend/.env` and set:
  - `PINATA_JWT`

Important: keep `.env` files private.

### 3) Deploy the contract to Sepolia

```bash
cd d:\blockchain_project_final\nft\nft
npm run compile
npm run deploy:sepolia
```

This writes:
- `frontend/public/js/contractConfig.js` (contract address + chainId)
- `frontend/public/js/abi/NFTMarketplace.json` (ABI)

### 4) Start the backend (serves UI + IPFS upload API)

```bash
cd d:\blockchain_project_final\nft\nft
npm run start
```

Open:
- UI: `http://localhost:4000`
- Health: `http://localhost:4000/api/health`

### 5) Use the UI

- Click **Connect MetaMask** (switch to the network in `contractConfig.js`)
- Go to **Mint NFT**
  - Upload a file → backend uploads to Pinata IPFS
  - Frontend mints on-chain with `tokenURI`
  - Then lists the NFT for sale at your chosen price
- Marketplace shows tokens directly from the contract.

---

## 🌐 Backend API Endpoints

| Method | Endpoint | Requirement | Description |
|---|---|---|---|
| `GET` | `/api/health` | All | Status + requirements checklist |
| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Backend status |
| `POST` | `/api/ipfs/upload` | Upload file + metadata JSON to Pinata → returns `tokenURI` |

---

## 🧪 Test the API (curl examples)

```bash
# Health check
curl http://localhost:4000/api/health

# Mint an NFT
curl -X POST http://localhost:4000/api/nfts/mint \
  -F "asset=@/path/to/image.png" \
  -F "creator=user_abc123" \
  -F "name=My First NFT" \
  -F "description=A beautiful piece" \
  -F "category=Digital Art" \
  -F "price=0.5" \
  -F "copyright=© 2024 Artist" \
  -F "license=CC BY 4.0" \
  -F "tags=art,blue,abstract"

# List NFTs with search
curl "http://localhost:4000/api/nfts?search=art&category=Digital+Art&sort=popular"

# Buy an NFT
curl -X POST http://localhost:4000/api/nfts/<TOKEN_ID>/buy \
  -H "Content-Type: application/json" \
  -d '{"buyer":"user_xyz789"}'

# View blockchain
curl http://localhost:4000/api/nfts/blockchain/chain

# View ownership history
curl http://localhost:4000/api/nfts/<TOKEN_ID>/history
```

---

## 🧪 Local Dev (optional)

Run a local chain:

```bash
cd d:\blockchain_project_final\nft\nft
npm run node:local
```

In a second terminal:

```bash
npm run deploy:local
```

MetaMask must be connected to `http://127.0.0.1:8545` (chainId `31337`).

## 🔐 Security Notes

| Feature | Current (Demo) | Production Replacement |
|---|---|---|
| Blockchain | In-memory PoW simulation | Ethereum / Polygon via `ethers.js` |
| File Storage | Memory buffer (lost on restart) | IPFS via `ipfs-http-client` |
| Database | `Map` in-memory | PostgreSQL or MongoDB |
| Payments | Balance deduction simulation | MetaMask + ERC-721 smart contracts |
| Auth | Random wallet ID per session | WalletConnect / MetaMask authentication |

---

## 🔐 Security Features

- Never expose `PRIVATE_KEY` or `PINATA_JWT` in the frontend.
- Contract `buy()` uses `nonReentrant` and clears listing before external calls.
- Frontend sends exact ETH value required by the listing.
- For production: prefer audited patterns (escrow/pull-payments) and add listing expiry / fees.
