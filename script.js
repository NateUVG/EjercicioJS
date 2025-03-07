document.addEventListener('DOMContentLoaded',() => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.height = '100vh';

    const button = document.createElement('button');
    button.textContent = 'Cargar datos';
    button.onclick = fetchDatos;

    const resultadosCont = document.createElement('div');
    resultadosCont.id = 'resultados';

    container.appendChild(button);
    container.appendChild(resultadosCont);
    document.body.appendChild(container);
});

function fetchDatos () {
    const resultadosCont = document.getElementById('resultados');
    resultadosCont.innerHTML = 'Cargando Datos . . .';

    fetch('https://akabab.github.io/starwars-api/api/all.json')
        .then(response => {
            console.log('Response', response);
            return response.json();
        })

        .then(data => {
            resultadosCont.innerHTML = '';
            resultadosCont.style.width = '80%';
            resultadosCont.style.height = '100vh';
            resultadosCont.style.margin = '0 auto';
            resultadosCont.style.overflow = 'auto';
            resultadosCont.style.display = 'grid';
            resultadosCont.style.gridTemplateColumns = 'repeat(3, 1fr)';
            resultadosCont.style.gap = '10px';

            const dataImages = data.filter(character => character.image);

            const randomCharacters = dataImages.sort(() => Math.random() - 0.5).slice(0, 10);

            randomCharacters.forEach(character => {
                const characterElement = document.createElement('div');
                characterElement.innerHTML = `
                    <p>ID: ${character.id}</p>
                    <p>Name: ${character.name}</p>
                    <img src="${character.image}" alt="${character.name}" width="100px" />
                `;

                characterElement.style.border = '1px solid #ccc';
                characterElement.style.padding = '10px';
                characterElement.style.borderRadius = '16px';
                resultadosCont.appendChild(characterElement);
            });
        })
}