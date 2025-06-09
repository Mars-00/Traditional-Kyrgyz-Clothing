
document.addEventListener('DOMContentLoaded', function() {
   // Поиск
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // Моковые данные для поиска
    const searchData = [
        { title: "Калпак", link: "history.html#kalpak", description: "Традиционный мужской головной убор из войлока" },
        { title: "Элечек", link: "history.html#elechek", description: "Женский головной убор замужних женщин" },
        { title: "Чуба", link: "history.html#chuba", description: "Мужская верхняя одежда" },
        { title: "Кементай", link: "history.html#kementai", description: "Традиционная мужская рубаха" },
        { title: "Белдемчи", link: "history.html#beldemchi", description: "Женская юбка из войлока" },
        { title: "Чапан", link: "history.html#chapan", description: "Длинный халат, носимый мужчинами и женщинами" },
        { title: "Маасы", link: "history.html#maasy", description: "Традиционная кожаная обувь" }
    ];
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch();
    });
    
    searchInput.addEventListener('input', function() {
        if (searchInput.value.length > 2) {
            performSearch();
        } else {
            searchResults.classList.remove('visible');
        }
    });
    
    function performSearch() {
        const query = searchInput.value.toLowerCase();
        if (query.length < 3) return;
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );
        
        displayResults(results);
    }
    
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p>Ничего не найдено. Попробуйте другой запрос.</p>';
            searchResults.classList.add('visible');
            return;
        }
        
        let html = '<ul>';
        results.forEach(result => {
            html += `
                <li>
                    <a href="${result.link}">
                        <h4>${result.title}</h4>
                        <p>${result.description}</p>
                    </a>
                </li>
            `;
        });
        html += '</ul>';
        
        searchResults.innerHTML = html;
        searchResults.classList.add('visible');
    }
    
    // Закрытие результатов поиска при клике вне
    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target)) {
            searchResults.classList.remove('visible');
        }
    });
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация карточек при загрузке
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});