import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

async function mint1() {
  const form = new FormData();
  form.append('creator', '0x1111111111111111111111111111111111111111');
  form.append('name', 'Epic Music Track');
  form.append('price', '3.0');
  form.append('category', 'Music');
  form.append('description', 'An epic orchestral music track for games');
  form.append('tags', 'music,orchestral,epic');
  form.append('asset', fs.createReadStream('music1.txt'));

  const response = await fetch('http://localhost:4000/api/nfts/mint', { method: 'POST', body: form });
  const data = await response.json();
  if (data.success) {
    console.log('NFT 1 Minted:', data.data?.nft?.name);
  } else {
    console.log('Error:', data.error);
  }
}

mint1();