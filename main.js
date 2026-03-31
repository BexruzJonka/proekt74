const nameInput = document.getElementById('nameInput');
const searchBtn = document.getElementById('searchBtn');
const resultDiv = document.getElementById('result');
const countryNameText = document.getElementById('countryName');
const flagImg = document.getElementById('flagImg');
const errorText = document.getElementById('error');

async function getNationality() {
    const name = nameInput.value.trim();
    
    if (!name) {
        showError("Iltimos, ism kiriting!");
        return;
    }

    // Очищаем прошлые результаты
    errorText.classList.add('hidden');
    resultDiv.classList.add('hidden');

    try {
        // Динамический URL для получения данных по имени
        const response = await fetch(`https://api.nationalize.io/?name=${name}`);
        const data = await response.json();

        if (data.country && data.country.length > 0) {
            const topCountry = data.country[0]; // Берем самую вероятную страну
            const countryId = topCountry.country_id; // Код страны (например, UZ, US)
            const probability = (topCountry.probability * 100).toFixed(1);

            // Показываем результат
            countryNameText.innerHTML = `Millati: <span class="text-blue-600">${countryId}</span> (${probability}%)`;
            
            // Динамический URL для флага (используем сервис flagpedia или аналоги)
            flagImg.src = `https://flagcdn.w/w320/${countryId.toLowerCase()}.png`;
            
            resultDiv.classList.remove('hidden');
        } else {
            showError("Ism topilmadi yoki millatni aniqlab bo'lmadi.");
        }
    } catch (err) {
        showError("Xatolik yuz berdi. Internetni tekshiring.");
    }
}

function showError(msg) {
    errorText.textContent = msg;
    errorText.classList.remove('hidden');
}

// Слушатели событий
searchBtn.addEventListener('click', getNationality);

// Поиск по нажатию Enter
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getNationality();
});