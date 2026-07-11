import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

async function mint5() {
  const form = new FormData();
  form.append('creator', '0x5555555555555555555555555555555555555555');
  form.append('name', '3D Character Model');
  form.append('price', '4.5');
  form.append('category', '3D Art');
  form.append('description', 'High-quality 3D character model for games');
  form.append('tags', '3d,model,character,gaming');
  form.append('asset', fs.createReadStream('model1.txt'));

  const response = await fetch('http://localhost:4000/api/nfts/mint', { method: 'POST', body: form });
  const data = await response.json();
  console.log('NFT 5 Minted:', data.data?.nft?.name || 'Error');
}

mint5();