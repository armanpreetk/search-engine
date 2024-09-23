// Get elements from the DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const clearHistoryButton = document.getElementById('clearHistoryButton');
const searchHistoryList = document.getElementById('searchHistoryList');

// Initialize search history array
let searchHistory = [];

// Load search history from localStorage if available
if (localStorage.getItem('searchHistory')) {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    updateSearchHistoryUI();
}

// Event listener for the Search button
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        const searchItem = {
            term: searchTerm,
            time: new Date().toLocaleString() // Store the current date and time
        };
        searchHistory.push(searchItem);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        updateSearchHistoryUI();
        searchInput.value = ''; // Clear input after search
    }
});

// Function to update the search history UI
function updateSearchHistoryUI() {
    searchHistoryList.innerHTML = ''; // Clear the list first
    searchHistory.forEach((item, index) => {
        const listItem = document.createElement('li');
        
        // Create a container to hold the term, timestamp, and delete button
        const listItemContent = document.createElement('div');
        listItemContent.style.display = 'flex';
        listItemContent.style.justifyContent = 'space-between';
        listItemContent.style.alignItems = 'center';
        
        // Search term element
        const termElement = document.createElement('span');
        termElement.textContent = item.term;
        termElement.style.flex = '1'; // Takes up remaining space
        
        // Timestamp element
        const timeElement = document.createElement('span');
        timeElement.textContent = item.time;
        timeElement.style.fontSize = '12px'; // Smaller font for timestamp
        timeElement.style.color = '#7f8c8d'; // Light grey for timestamp

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.padding = '4px 8px';
        deleteButton.style.backgroundColor = '#e74c3c';
        deleteButton.style.color = 'white';
        deleteButton.style.border = 'none';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.borderRadius = '4px';

        // Event listener for the delete button
        deleteButton.addEventListener('click', () => {
            searchHistory.splice(index, 1); // Remove the item from the array
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
            updateSearchHistoryUI(); // Refresh the history list
        });
        
        // Append all elements to the list item content container
        listItemContent.appendChild(termElement);
        listItemContent.appendChild(timeElement);
        listItemContent.appendChild(deleteButton);
        
        // Append the content to the list item
        listItem.appendChild(listItemContent);
        
        // Finally, append the list item to the history list
        searchHistoryList.appendChild(listItem);
    });
}

// Event listener for the Clear History button
clearHistoryButton.addEventListener('click', () => {
    localStorage.removeItem('searchHistory');
    searchHistory = [];
    updateSearchHistoryUI();
});
