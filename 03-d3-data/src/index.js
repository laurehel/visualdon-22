// 1 - Charger les données
import * as d3 from "d3";
import { json } from "d3-fetch";

const URL = "https://jsonplaceholder.typicode.com/";

Promise.all([
    json(`${URL}users`), 
    json(`${URL}posts`)
])
.then(
	([users, posts]) => {
		console.log(users);
		console.log(posts);
		createData(users, posts);
	}
);

// 2 - Manipuler les données 
// 2.1 - Tableau d'objets
function createData(users, posts) {

	let datas = [];
	users.map((e) => {

		datas.push({ // Pousser des données à la fin du tableau datas
			nom_utilisateur: e.username, // Tableau users (10)
    		ville: e.address.city, // Tableau users (10)
    		nom_companie: e.company.name, // Tableau users (10)
			titres_posts: d3
				.filter(posts, (p) => p.userId == e.id) // Tableau posts (100) id == Tableau users (10) id
				.map((post) => post.title), // Tableau posts (100)
			posts: d3
				.filter(posts, (p) => p.userId == e.id) // Tableau posts (100) id == Tableau users (10) id
				.map((post) => post)
		});

	});
	//console.log(datas); // Tableau de 10 lignes et 5 colonnes

	displayOnDom(datas);
	
}

// 2.2 - DOM
function displayOnDom(datas) {

	// 2.2.1 - Nombre de posts par user
	d3.select("#data")
		.data(datas) // Joint la donnée aux éléments sélectionnés
		.enter() // Crée les éléments manquants et retourne la sélection enter 
		.append("p")
		.text(function (d) {
			return d.nom_utilisateur + " : " + d.titres_posts.length; 
		});

	let maxIndex = d3.maxIndex(datas, function (data) { // Index maximum du tableau datas
		console.log(data);
		return d3.max(data.posts, function (post) {
			return post.body.length;
		});

	});

	// 2.2.2 - User ayant écrit le texte le plus long
	d3.select("#data")
		.append("p")
		.text(function (d) {
			return "Le user ayant écrit le texte le plus long est : " + datas[maxIndex].nom_utilisateur;
		});

	// 3 - Dessiner avec les données
	// 3.1 - Graphique bâtons
	const graph = d3.select("#data")
            .append("svg")
			.append("g"); // Élément container qui groupe ensemble des éléments graphiques

	datas.forEach((element) => graph.append("g").append("rect"));

	graph.selectAll("rect")
            .data(datas)
            .attr('x', (d, i) => i * 30) // 30 = Largeur rectangle
            .attr('y', (d) => {
				100 - 8 * d.posts.length; // 8 = Facteur; d.posts.length = Longueur du tableau
			})
            .attr('width', 30) // Largeur rectangle
            .attr('height', (d) => 10* d.posts.length) // Hauteur longueur du tableau
            .style("fill", "purple")
			.style("stroke-width", "1px")
			.style("stroke", "black");

	// 3.2 - Étiquettes bâtons
  	graph.selectAll("g")
			.data(datas)
			.append("text")
			.attr("x", (d, i) => i * 30)
			.attr("y", (d) => {
				return 100 + 20;
			})
			.text(function (d) {
				return d.posts.length; // Nombre de posts (longueur de tableau)
			});

}
