import {
  getTotal,
  getIncrement,
  createChart,
  getDay,
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
      <h1>Dati nazionali</h1>
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
  fetch(
    `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      generateData(json, true);
    })
    .catch(() => {
      fetchError();
    });
};
