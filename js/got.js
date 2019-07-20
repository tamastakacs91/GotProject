const gotData = {
  init() {
    this.data = [];
    this.findAll();
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
  },


}

gotData.init();

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */