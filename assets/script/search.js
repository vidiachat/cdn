const searchInput = document.getElementById('search');
const suggestionsBox = document.getElementById('suggestions');

searchInput.addEventListener('input', function() {
  const query = this.value;

  if (query.length === 0) {
    suggestionsBox.innerHTML = '';
    return;
  }

  // Fetch suggestions data
  fetch(`api/search_suggest.php?query=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      suggestionsBox.innerHTML = '';

      if (data.length > 0) {
        data.forEach(item => {
          const suggestion = document.createElement('a');
          suggestion.href = `result.php?query=${encodeURIComponent(item)}`;
          suggestion.className = 'relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10';

          const icon = document.createElement('ion-icon');
          icon.className = 'text-2xl';
          icon.name = 'search-outline';

          const textNode = document.createTextNode(` ${item}`);

          suggestion.appendChild(icon);
          suggestion.appendChild(textNode);

          suggestion.addEventListener('click', () => {
            searchInput.value = item;
            suggestionsBox.innerHTML = '';
          });

          suggestionsBox.appendChild(suggestion);
        });
      } else {
        suggestionsBox.innerHTML = '';
      }
    })
    .catch(error => console.error('Error:', error));
});
