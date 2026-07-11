import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

async function mint4() {
  const form = new FormData();
  form.append('creator', '0x4444444444444444444444444444444444444444');
  form.append('name', 'Smart Contract Code');
  form.append('price', '8.0');
  form.append('category', 'Code');
  form.append('description', 'Revolutionary smart contract implementation');
  form.append('tags', 'code,smart-contract,blockchain');
  form.append('asset', fs.createReadStream('code1.txt'));

  const response = await fetch('http://localhost:4000/api/nfts/mint', { method: 'POST', body: form });
  const data = await response.json();
  console.log('NFT 4 Minted:', data.data?.nft?.name || 'Error');
}

mint4();