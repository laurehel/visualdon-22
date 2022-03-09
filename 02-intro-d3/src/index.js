import * as d3 from 'd3';

const WIDTH = 500
const HEIGHT = 300

const svg = d3.select("div.circles")
            .append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT);

// 1 - Création des cercles (circle1, 2, 3)
let circle1 = svg.append("circle")
            .attr("class", "circle1") // Important pour 4 - .on("click")
            .attr("cx", 50)
            .attr("cy", 50)
            .attr("r", 40)
            .attr("cx", 100); // 2b - 50px vers la droite

// 3 - Append du texte (p1, 2, 3)
let p1 = svg.append("text")
            .attr("class", "text1")
            .attr("x", 25)
            .attr("y", 100)
            .text("c'est le texte du 1er cercle");

let circle2 = svg.append("circle")
            .attr("class", "circle2")
            .attr("cx", 150) 
            .attr("cy", 150)
            .attr("r", 40)
            .style("fill", "red") // 2a - Changement de couleur
            .attr("cx", 200) // 2b - 50px vers la droite

let p2 = svg.append("text")
            .attr("class", "text2")
            .attr("x", 125)
            .attr("y", 200)
            .text("c'est le texte du 2ème cercle");

let circle3 = svg.append("circle")
            .attr("class", "circle3")
            .attr("cx", 250)
            .attr("cy", 250)
            .attr("r", 40)
            .on("click", () => { // 4 - Aligner les cercles
                document.querySelector(".circle1").setAttribute("cx", 250),
                document.querySelector(".circle2").setAttribute("cx", 250),
                document.querySelector(".text1").setAttribute("x", 175),
                document.querySelector(".text2").setAttribute("x", 175)
            }); 

let p3 = svg.append("text")
            .attr("x", 175)
            .attr("y", 300)
            .text("c'est le texte du 3ème cercle");
            
// 5 - Données
let donnees = [20, 5, 25, 8, 15];

const data = d3.select("div.data")
            .append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT);

data.selectAll()
            .data(donnees)
            .enter()
            .append('rect')
            .attr('x', (d,i) => i*30 )
            .attr('y', (d) => 100-d)
            .attr('width', 20)
            .attr('height', (d) => d)
            .style("fill", "purple");

