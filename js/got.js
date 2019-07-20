const gotData = {
  data: [],
  aliveCharacters: [],

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

  setData(characterData) {
    this.data = JSON.parse(characterData);
    this.getAliveCharacters();
    this.sortAliveCharacters();
    this.showAliveCharacters();
  },

  getAliveCharacters() {
    for (let i = 0; i < this.data.length; i += 1) {
      if (this.data[i].dead !== true) {
        this.aliveCharacters.push(this.data[i]);
      }
    }
    return this.aliveCharacters;
  },

  sortAliveCharacters() {
    this.aliveCharacters.sort((a, b) => {
      const nameA = a.name;
      const nameB = b.name;

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  },

  showAliveCharacters() {
    let characterDiv = '';
    for (let i = 0; i < this.aliveCharacters.length; i += 1) {
      characterDiv += this.createCharacterDivs(this.aliveCharacters[i]);
    }
    this.elements.characterDivs.innerHTML += characterDiv;
  },

  createCharacterDivs(character) {
    return `
    <div class="character-div--unit">
      <div class="character-div--portrait">
        <img src=${character.portrait} alt=${character.name}>
     </div>
      <div class="character-div--name">
        <p>${character.name}</p>
      </div>
    </div>
    `;
  },


};

gotData.init();

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
