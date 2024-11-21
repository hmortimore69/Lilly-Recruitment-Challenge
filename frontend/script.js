document.addEventListener('DOMContentLoaded', function() {
    const newMedicineForm = document.getElementById('new-medicine-form');
    const updateMedicineForm = document.getElementById('update-medicine-form');
    const deleteMedicineForm = document.getElementById('delete-medicine-form');

    const medicineList = document.getElementById('medicine-list');
    const updateMedicineSelect = document.getElementById('update-medicine-select');
    const deleteMedicineSelect = document.getElementById('delete-medicine-select');

    // Reset all forms
    newMedicineForm.reset();
    updateMedicineForm.reset();
    deleteMedicineForm.reset();

    fetch('http://localhost:8000/average')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const averagePriceElement = document.getElementById('average-price');

            averagePriceElement.textContent = `Average Price: £${data}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });


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
            
                const nameSpan = document.createElement('span');
                nameSpan.className = 'medicine-name';
                nameSpan.textContent = name;
            
                const priceSpan = document.createElement('span');
                priceSpan.className = 'medicine-price';
                priceSpan.textContent = price;
            
                listItem.appendChild(nameSpan);
                listItem.appendChild(priceSpan);
                medicineList.appendChild(listItem);

                // Dropdown boxes
                const updateOption = document.createElement('option');
                updateOption.value = medicine.name;
                updateOption.textContent = name;
                updateMedicineSelect.appendChild(updateOption);

                const deleteOption = document.createElement('option');
                deleteOption.value = medicine.name;
                deleteOption.textContent = name;
                deleteMedicineSelect.appendChild(deleteOption);
            })
        })
        .catch(error => {
            console.error('Error:', error);
        }); 

    newMedicineForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name');
    
        fetch(`http://localhost:8000/medicines/${name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.name === name) {
                    alert('This medicine already exists in the list.');
                    return;
                }
    
                return fetch(this.action, {
                    method: this.method,
                    body: formData
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    updateMedicineForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch(this.action, {
            method: this.method,
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch(error => {
            console.log("Error:", error);
        });
    });

    deleteMedicineForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch(this.action, {
            method: "DELETE",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch(error => {
            console.log("Error:", error);
        })
    })
});

