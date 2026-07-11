import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

async function mint2() {
  const form = new FormData();
  form.append('creator', '0x2222222222222222222222222222222222222222');
  form.append('name', 'Rare Gaming Asset');
  form.append('price', '5.5');
  form.append('category', 'Gaming');
  form.append('description', 'Rare in-game asset from popular game');
  form.append('tags', 'gaming,rare,asset');
  form.append('asset', fs.createReadStream('game1.txt'));

  const response = await fetch('http://localhost:4000/api/nfts/mint', { method: 'POST', body: form });
  const data = await response.json();
  console.log('Full response:', JSON.stringify(data, null, 2));
  if (data.success) {
    console.log('NFT 2 Minted:', data.data?.nft?.name);
  } else {
    console.log('Error:', data.error);
  }
}

mint2();