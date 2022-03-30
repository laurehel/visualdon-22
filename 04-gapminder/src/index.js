import * as d3 from 'd3'

// 1 - GRAPHIQUE STATIQUE
// Pour importer les données
import PIB from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import esperanceVie from '../data/life_expectancy_years.csv'
import population from '../data/population_total.csv'

// // Voir le contenu des tableaux csv
// console.log(PIB); // Tableau de 195 lignes, de 1800 à 2050 pour chaque pays
// console.log(esperanceVie); // Tableau de 195 lignes, de 1800 à 2100 pour chaque pays
// console.log(population); // Tableau de 195 lignes, de 1800 à 2100 pour chaque pays 

// console.log(PIB[0]["2021"]);
// console.log(esperanceVie[0]["2021"]);
// console.log(population[0]["2021"]);

// Marges du graphique
const margin = {top : 10, right: 40, bottom: 30, left: 40},
		   width = 1000 - margin.left - margin.right,
		   height = 1000 - margin.top - margin.bottom;

// Création d'un élément svg graphique avec ses marges dans le div #staticGraph
const svg = d3
    .select('#staticGraph')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Création d'un nouveau tableau pour regrouper les informations désirées des 3 tableaux csv ()
let datas = [];

PIB.map(e => {
    datas.push({
        pays: e.country,
        PIB: e["2021"],
        esperance_vie: d3
            .filter(esperanceVie, (ev) => ev.country == e.country)
            .map((d) => d["2021"])[0],
        population: d3
            .filter(population, (p) => p.country == e.country)
            .map((d) => d["2021"])[0]
    });
});

// 2 axes ajoutés
const x = d3
    .scaleLinear()
    .domain([0, 100000])
    .range([0, width]);

svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

const y = d3
    .scaleLinear()
    .domain([40, 100])
    .range([height, 0])

svg.append('g')
    .call(d3.axisLeft(y));

// Ajout d'une grandeur aux ronds
const z = d3
    .scaleLinear()
    .domain([200000, 1310000000])
    .range([1, 40]);

// Ajout des points
svg
    .append("g")
    .selectAll("dot")
    .data(datas)
    .join("circle")
    .attr("cx", (d) => x(cleanData(d.PIB)))
    .attr("cy", (d) => y(cleanData(d.esperance_vie)))
    .attr("r", (d) => z(cleanData(d.population) * 5))
    .style("fill", "purple")
    .style("opacity", "0.7")
    .attr("stroke", "black");

// Nettoyer les donnés pour obtenir des chiffres (1000, 1000000, 1000000000) au lieu des charactères (K, M, B)
function cleanData(data) {

  if (isNaN(data)) {

    if (data.includes("k")) { // Passer de k à 1000
      const n = data.split("k")[0];
      return Number.parseFloat(n) * 1000;
    } 
    else if (data.includes("M")) { // Passer de M à 1000000
      const n = data.split("M")[0];
      return Number.parseFloat(n) * 1000000;
    }
    //   else if (data.includes("B")) { // Passer de B à 1000000000000
    //   const n = data.split("B")[0];
    //   return Number.parseFloat(n) * 1000000000;
    // }

  }

  return data;

}

// // Alternative à la fonction ci-dessus
// const popTransformed = population.map(d => {

//     // Trouver le format SI (M, B, k)
//     let SI = typeof d["2021"] === 'string' || d["2021"] instanceof String ? d["2021"].slice(-1) : d["2021"];

//     // Extraire la partie numérique
//     let number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0,-1)) : d["2021"];
    
//     // Selon la valeur SI, multiplier par la puissance
//     switch (SI) {
//         case 'M': {
//             return { "country": d.country, "pop": Math.pow(10, 6) * number};
//             break;
//         }
//         case 'B': {
//             return { "country": d.country, "pop": Math.pow(10, 9) * number};
//             break;
//         }
//         case 'k': {
//             return { "country": d.country, "pop": Math.pow(10, 3) * number};
//             break;
//         }
//         default: {
//             return { "country": d.country, "pop": number};
//             break;
//         }
//     }
// })


