import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

async function mint3() {
  const form = new FormData();
  form.append('creator', '0x3333333333333333333333333333333333333333');
  form.append('name', 'Stunning Photograph');
  form.append('price', '2.2');
  form.append('category', 'Photography');
  form.append('description', 'Award-winning landscape photography');
  form.append('tags', 'photography,landscape,nature');
  form.append('asset', fs.createReadStream('photo1.txt'));

  const response = await fetch('http://localhost:4000/api/nfts/mint', { method: 'POST', body: form });
  const data = await response.json();
  console.log('NFT 3 Minted:', data.data?.nft?.name || 'Error');
}

mint3();