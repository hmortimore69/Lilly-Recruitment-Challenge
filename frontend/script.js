fetch('http://localhost:8000/medicines')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        data.medicines.forEach(medicine => {
            const name = medicine.name || "Unknown Medicine";
            const price = medicine.price !== null ? `£${medicine.price.toFixed(2)}` : "Price Unavailable";


            const listItem = document.createElement('li');
            listItem.textContent = `${name}: ${price}`;

            document.getElementById('medicine-list').appendChild(listItem);
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });