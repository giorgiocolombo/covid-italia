import {
  createChart,
  getDay,
  getTotal,
  getIncrement,
  addOptionToElement,
  datiStampa,
  datiAndamentoTotale,
  datiAndamentoIncremento,
  datiSSN,
  datiTamponi,
  generateData,
  fetchError,
} from "./general_functions.js";
export const html = () => /*html*/ `
    <div class="header">
        <h1>Dati regionali:</h1>
        <select></select>
    </div>
    <div class="charts_container">
      <div class="canvas__container">
        <canvas id="myChart1"></canvas>
      </div>

      <div class="canvas__container">
        <canvas id="myChart2"></canvas>
      </div>

      <div class="canvas__container">
        <canvas id="myChart3"></canvas>
      </div>

      <div class="canvas__container">
        <canvas id="myChart4"></canvas>
      </div>
    </div>

    <div class="data_container">
    </div>
`;

export const afterRender = () => {
  const select = document.querySelector("select");

  const getListOfRegion = (json) => {
    let lista = [];
    let i;
    for (i = 0; i < 35; i++) {
      if (lista.indexOf(json[i].denominazione_regione) < 0) {
        lista.push(json[i].denominazione_regione);
      }
    }
    return lista.sort();
  };

  const transformForGeneralFunction = (json, selectValue) => {
    let transformed = [];
    json.forEach((giorno) => {
      if (giorno.denominazione_regione === selectValue) {
        transformed.push(giorno);
      }
    });
    return transformed.reverse();
  };

  fetch(
    `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      json.reverse();
      addOptionToElement(select, getListOfRegion(json));
      generateData(transformForGeneralFunction(json, select.value), true);
      select.addEventListener("change", (evt) => {
        document.querySelector(".charts_container").innerHTML = ``;
        document.querySelector(".charts_container").innerHTML = /*html*/ `
          <div class="canvas__container">
            <canvas id="myChart1"></canvas>
          </div>
    
          <div class="canvas__container">
            <canvas id="myChart2"></canvas>
          </div>
    
          <div class="canvas__container">
            <canvas id="myChart3"></canvas>
          </div>
    
          <div class="canvas__container">
            <canvas id="myChart4"></canvas>
          </div>
          `;
        generateData(transformForGeneralFunction(json, select.value), true);
      });
    })
    .catch(() => {
      fetchError();
    });
};
