

export const postProductData = async (formData) => {
try {
    const response = await fetch('http://127.0.0.1:5000/api/items/postitem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Data from server:', data);  // Handle the server response
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }}