const gotData = {
  data: [],
  aliveCharacters: [],

  init() {
    this.findAll();
  },

  elements: {
    characterDivs: document.querySelector('.character-div'),
    sidebar: document.querySelector('.sidebar-div--click-area'),
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
        this.data[i].id = i + 1;
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
    <div class="character-div--unit" data-id=${character.id} onclick="gotData.showTheNameOfClickedCharacter(${character.id})">
      <div class="character-div--portrait">
        <img src="${character.portrait}" alt="${character.name}">
      </div>
      <div class="character-div--name">
        <p>${character.name}</p>
      </div>
    </div>
    `;
  },

  showTheNameOfClickedCharacter(id) {
    const unit = document.querySelector(`.character-div--unit[data-id ="${id}"]`);
    const para = unit.querySelector('.character-div--name');
    const text = para.querySelector('p').textContent;
    console.log(text);
    let sidebarContent = '';

    for (let i = 0; i < this.aliveCharacters.length; i += 1) {
      if (text === this.aliveCharacters[i].name) {
        sidebarContent += `
        <div>
        <h2>Game of Thrones</h2>
        </div>
        <div>
        <img src="${this.aliveCharacters[i].picture}" alt="${this.aliveCharacters[i].name}">
        </div>
        <div>
        <p>
        ${this.aliveCharacters[i].bio}
        </p>
        </div>
        `;
      }
    }
    this.elements.sidebar.innerHTML = sidebarContent;
  },

  // showCharacterDetails() {
  //   const clickedCharacter = this.showTheNameOfClickedCharacter();
  //   console.log(clickedCharacter);
  // },

};


gotData.init();
