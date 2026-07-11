import fetch from 'node-fetch';

async function testBuy() {
  const tokenId = '963b9517-2448-4ad7-94be-1364d8229feb'; // from mint
  const buyer = '0xabcdef1234567890';

  try {
    const response = await fetch(`http://localhost:4000/api/nfts/buy/${tokenId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        buyer: buyer
      })
    });
    const data = await response.json();
    console.log('Buy result:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testBuy();