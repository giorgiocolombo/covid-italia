export const getTotal = (json, arg) => {
  let results = [];
  Object.values(json).forEach((giorno) => {
    results.push(giorno[arg]);
  });
  return results;
};

export const getDay = (json) => {
  let results = [];
  Object.values(json).forEach((giorno) => {
    results.push(giorno["data"].substring(5, 10));
  });
  return results;
};

export const getIncrement = (json, arg) => {
  const totalArray = getTotal(json, arg);
  return totalArray.map((giorno, i) => {
    if (i <= 0) {
      return giorno;
    } else {
      return giorno - totalArray[i - 1];
    }
  });
};

export const createChart = (id, dati, tipo, titolo) => {
  const ctx = document.getElementById(id).getContext("2d");
  let myChart = new Chart(ctx, {
    type: tipo,
    data: dati,
    options: {
      legend: {
        labels: {
          fontColor: "#fff",
        },
      },
      title: {
        display: true,
        text: titolo,
        fontSize: 17,
        fontColor: "white",
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontColor: "#fff",
              display: false,
            },
            gridLines: {
              display: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontColor: "#fff",
              display: false,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    },
  });
};

export const datiAndamentoTotale = (json) => {
  return {
    labels: getDay(json),
    datasets: [
      {
        label: "Casi totali",
        data: getTotal(json, "totale_casi"),
        backgroundColor: ["rgba(255, 99, 132, 0)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
      },
      {
        label: "Infetti",
        data: getTotal(json, "totale_positivi"),
        backgroundColor: ["rgba(54, 162, 235, 0)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
      },
      {
        label: "Guariti",
        data: getTotal(json, "dimessi_guariti"),
        backgroundColor: ["rgba(255, 206, 86, 0)"],
        borderColor: ["rgba(255, 206, 86, 1)"],
      },
      {
        label: "Deceduti",
        data: getTotal(json, "deceduti"),
        backgroundColor: ["rgba(75, 192, 192, 0)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
      },
    ],
  };
};
export const datiAndamentoIncremento = (json) => {
  return {
    labels: getDay(json),
    datasets: [
      {
        label: "Casi",
        data: getIncrement(json, "totale_casi"),
        backgroundColor: ["rgba(255, 99, 132, 0)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
      },
      {
        label: "Infetti",
        data: getIncrement(json, "totale_positivi"),
        backgroundColor: ["rgba(54, 162, 235, 0)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
      },
      {
        label: "Guariti",
        data: getIncrement(json, "dimessi_guariti"),
        backgroundColor: ["rgba(255, 206, 86, 0)"],
        borderColor: ["rgba(255, 206, 86, 1)"],
      },
      {
        label: "Deceduti",
        data: getIncrement(json, "deceduti"),
        backgroundColor: ["rgba(75, 192, 192, 0)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
      },
    ],
  };
};
export const datiSSN = (json) => {
  return {
    labels: getDay(json),
    datasets: [
      {
        label: "Isolamento Domiciliare",
        data: getTotal(json, "isolamento_domiciliare"),
        backgroundColor: ["rgba(255, 99, 132, 0)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
      },
      {
        label: "Totale ospedalizzati",
        data: getTotal(json, "totale_ospedalizzati"),
        backgroundColor: ["rgba(54, 162, 235, 0)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
      },
      {
        label: "Ospedalizzati con sintomi",
        data: getTotal(json, "ricoverati_con_sintomi"),
        backgroundColor: ["rgba(255, 206, 86, 0)"],
        borderColor: ["rgba(255, 206, 86, 1)"],
      },
    ],
  };
};
export const datiTamponi = (json) => {
  return {
    labels: getDay(json),
    datasets: [
      {
        label: "Positivi",
        data: getIncrement(json, "totale_casi"),
        backgroundColor: ["rgba(255, 99, 132, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
      },
      {
        label: "Tamponi",
        data: getIncrement(json, "tamponi"),
        backgroundColor: ["rgba(54, 162, 235, 1)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
      },
    ],
  };
};

export const datiStampa = (json, extended) => {
  document.querySelector(".data_container").innerHTML = ``;
  const dastampare = json;
  dastampare.reverse();
  dastampare.forEach((giorno, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    if (extended) {
      if (index >= dastampare.length - 1) {
        card.innerHTML = /*html*/ `
        <h3>${giorno.data.substring(0, 10)}</h3>
        <h4 style="color:#FF6384">Casi Totali</h4>
        <p style="color:#FF6384">${giorno.totale_casi} (${
          giorno.nuovi_positivi
        })</p>
        <h4 style="color:#36A2EB">Infetti</h4>
        <p style="color:#36A2EB">${giorno.totale_positivi} (${
          giorno.variazione_totale_positivi
        })</p>
        <h4 style="color:#FFCE56">Guariti</h4>
        <p style="color:#FFCE56">${giorno.dimessi_guariti}</p>
        <h4 style="color:#4BC0C0">Deceduti</h4>
        <p style="color:#4BC0C0">${giorno.deceduti}</p>
      `;
      } else {
        card.innerHTML = /*html*/ `
        <h3>${giorno.data.substring(0, 10)}</h3>
        <h4 style="color:#FF6384">Casi Totali</h4>
        <p style="color:#FF6384">${giorno.totale_casi} (${
          giorno.nuovi_positivi
        })</p>
        <h4 style="color:#36A2EB">Infetti</h4>
        <p style="color:#36A2EB">${giorno.totale_positivi} (${
          giorno.variazione_totale_positivi
        })</p>
        <h4 style="color:#FFCE56">Guariti</h4>
        <p style="color:#FFCE56">${giorno.dimessi_guariti} (${
          giorno.dimessi_guariti - dastampare[index + 1].dimessi_guariti
        })</p>
        <h4 style="color:#4BC0C0">Deceduti</h4>
        <p style="color:#4BC0C0">${giorno.deceduti} (${
          giorno.deceduti - dastampare[index + 1].deceduti
        })</p>`;
      }
    } else {
      if (index >= dastampare.length - 1) {
        card.innerHTML = /*html*/ `
        <h3>${giorno.data.substring(0, 10)}</h3>
        <h4 style="color:#FF6384">Casi Totali</h4>
        <p style="color:#FF6384">${giorno.totale_casi}</p>
      `;
      } else {
        card.innerHTML = /*html*/ `
        <h3>${giorno.data.substring(0, 10)}</h3>
        <h4 style="color:#FF6384">Casi Totali</h4>
        <p style="color:#FF6384">${giorno.totale_casi} (${
          giorno.totale_casi - dastampare[index + 1].totale_casi
        })</p>
        `;
      }
    }

    document.querySelector(".data_container").appendChild(card);
  });
};

export const addOptionToElement = (element, array) => {
  array.forEach((valore) => {
    const option = document.createElement("option");
    option.innerHTML = `${valore}`;
    element.appendChild(option);
  });
};

export const generateData = (json, extended) => {
  createChart(
    "myChart1",
    datiAndamentoTotale(json),
    "line",
    "Andamento Totale"
  );
  createChart(
    "myChart2",
    datiAndamentoIncremento(json),
    "line",
    "Dati giornalieri"
  );
  if (extended) {
    createChart("myChart3", datiSSN(json), "line", "Dati sistema sanitario");
    createChart("myChart4", datiTamponi(json), "line", "Dati tamponi");
  }
  datiStampa(json, extended);
};

export const fetchError = () => {
  document.querySelector("#app").innerHTML = /*html*/ `
      <div class="header">
        <h1>Can't fetch data</h1>
      </div>
      `;
};
