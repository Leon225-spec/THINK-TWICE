document.addEventListener('DOMContentLoaded', () => {
    const comparisonContainer = document.getElementById('comparison-container');
    const voteLeftButton = document.getElementById('vote-left');
    const voteRightButton = document.getElementById('vote-right');
    const categorySelect = document.getElementById('category-select');
    const resultsText = document.getElementById('results-text');
  
    let currentComparisonIndex = 0;
    let comparisons = [];
  
    // Load data from localStorage
    function loadData() {
      const savedData = localStorage.getItem('comparisons');
      if (savedData) {
        comparisons = JSON.parse(savedData);
      }
    }
  
    // Save data to localStorage
    function saveData() {
      localStorage.setItem('comparisons', JSON.stringify(comparisons));
    }
  
    loadData();
    loadComparison();
  
    // Load comparison
    function loadComparison() {
      const comparison = comparisons[currentComparisonIndex];
      if (!comparison) return;
  
      comparisonContainer.style.opacity = 0;
      comparisonContainer.style.transform = 'translateY(20px)';
  
      setTimeout(() => {
        comparisonContainer.innerHTML = `
          <div class="item">
            <img src="${comparison.item1.image}" alt="${comparison.item1.name}">
            <p>${comparison.item1.name}</p>
          </div>
          <div class="item">
            <img src="${comparison.item2.image}" alt="${comparison.item2.name}">
            <p>${comparison.item2.name}</p>
          </div>
        `;
  
        showResults();
        comparisonContainer.style.opacity = 1;
        comparisonContainer.style.transform = 'translateY(0)';
      }, 300);
    }
  
    // Show results
    function showResults() {
      const comparison = comparisons[currentComparisonIndex];
      const totalVotes = comparison.item1.votes + comparison.item2.votes;
  
      let results = '';
      if (totalVotes === 0) {
        results = 'No votes yet!';
      } else {
        const item1Percentage = ((comparison.item1.votes / totalVotes) * 100).toFixed(1);
        const item2Percentage = ((comparison.item2.votes / totalVotes) * 100).toFixed(1);
  
        results = `
          ${comparison.item1.name}: ${item1Percentage}%
          ${comparison.item2.name}: ${item2Percentage}%
        `;
      }
  
      resultsText.innerText = results;
    }
  
    // Next comparison
    function nextComparison() {
      currentComparisonIndex++;
      if (currentComparisonIndex >= comparisons.length) {
        alert('No more comparisons available!');
        currentComparisonIndex = 0;
      }
      loadComparison();
    }
  
    // Voting buttons
    voteLeftButton.addEventListener('click', () => {
      const comparison = comparisons[currentComparisonIndex];
      comparison.item1.votes++;
      saveData();
      nextComparison();
    });
  
    voteRightButton.addEventListener('click', () => {
      const comparison = comparisons[currentComparisonIndex];
      comparison.item2.votes++;
      saveData();
      nextComparison();
    });
  
    // Category filter
    categorySelect.addEventListener('change', (e) => {
      const selectedCategory = e.target.value;
      if (selectedCategory === 'all') {
        currentComparisonIndex = 0;
        loadComparison();
      } else {
        const filteredComparisons = comparisons.filter(
          (comparison) => comparison.category === selectedCategory
        );
        comparisons = filteredComparisons;
        currentComparisonIndex = 0;
        loadComparison();
      }
    });
  
    // Create comparison form
    document.getElementById('comparison-form').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Convert images to base64
      const item1Image = document.getElementById('item1-image').files[0];
      const item2Image = document.getElementById('item2-image').files[0];
  
      const item1Base64 = await convertToBase64(item1Image);
      const item2Base64 = await convertToBase64(item2Image);
  
      const newItem1 = {
        name: document.getElementById('item1-name').value,
        image: item1Base64,
        votes: 0
      };
  
      const newItem2 = {
        name: document.getElementById('item2-name').value,
        image: item2Base64,
        votes: 0
      };
  
      const newComparison = {
        id: comparisons.length + 1,
        category: 'user-generated',
        item1: newItem1,
        item2: newItem2
      };
  
      comparisons.push(newComparison);
      saveData();
      document.getElementById('comparison-form').reset();
      alert('New comparison added!');
    });
  
    // Convert file to base64
    function convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  });