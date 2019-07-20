const gotData = {
  data: [],

  init() {
    this.findAll();
  },

  elements: {
    characterDivs: document.querySelector('.character-div'),
  },


  findAll() {
    const request = new XMLHttpRequest();
    request.onload = () => {
      this.setData(request.responseText);
    };
    request.onerror = () => {
      alert('Hiba a fájl betöltésekor');
    };
    request.open('GET', '../json/got.json');
    request.send();
  },

  setData(userData) {
    this.data = JSON.parse(userData);
    this.showAliveCharacters();
  },

  showAliveCharacters() {
    let characterDiv = '';
    let aliveCharacters = 0;
    for (let i = 0; i < this.data.length; i += 1) {
      if (this.data[i].dead !== true) {
        aliveCharacters += 1;
        characterDiv += this.createCharacterDivs(this.data[i]);
      }
    }
    console.log(aliveCharacters);
    this.elements.characterDivs.innerHTML += characterDiv;
  },

  createCharacterDivs(character) {
    return `
    <div>
      <div>
        <img src=${character.portrait} alt=${character.name}>
     </div>
      <div>
        <p>${character.name}</p>
      </div>
    </div>
    `;
  },


};

gotData.init();

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
