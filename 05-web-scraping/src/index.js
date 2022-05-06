import jsdom from "jsdom";
import fetch from "isomorphic-fetch"
import puppeteer from "puppeteer"

console.log("hiiiiiiiiiiii")

// 1 - Faire une capture d'écran de la page des cantons Wikipédia avec puppeteer
async function capture(url) {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
        defaultViewport: { // Adapter la taille du screenshot (surtout height)
            width: 1920,
            height: 1800
        }
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ 
        path: 'screenshotWiki.png',
        // fullPage: true // Prend un screen de la page entière 
    })
    await browser.close();
}
capture("https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales");


// 2 - Récupération des données
// 2a - Webscraper Wikipedia : Donner tous les noms de cantons et les populations respectives à partir de la page Wikipedia
async function webscrap() {
    const url = "https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales";
    const response = await fetch(url);
    const html = await response.text();
    const dom = new jsdom.JSDOM(html);

    const cantons = dom.window.document.querySelectorAll("#mw-content-text > div > table > tbody > tr > td > i"); // Cherche les noms de cantons (on voit le chemin en inspectant un nom de canton, stocké dans un i)
    const populations = dom.window.document.querySelectorAll("#mw-content-text > div > table > tbody > tr > td > bdi"); // Cherche le nombre de population (on voit le chemin en inspectant un nombre de population, stocké dans un bdi)
    const data = []; // Création d'un tableau vide

    for (let i = 0; i < cantons.length; i++) { // Création d'une boucle avec le nombre de cantons total
        data.push({ // Ajout de données dans le tableau sous forme d'objets avec 1 canton et 1 population
            canton: cantons[i].textContent,
            population: populations[i].textContent
        });
    }
    return data;
}
webscrap().then(data => console.log(data)); // Affichage du tableau avec node src/index.js

// 2b - Webscraper un site e-commerce : https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops
async function webscrap2() {
    const url = "https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops";
    const response = await fetch(url);
    const html = await response.text();
    const dom = new jsdom.JSDOM(html);

    const produits = dom.window.document.querySelectorAll("div.thumbnail > div.caption > h4:nth-child(2) > a"); // Cherche les noms de produits (on voit le chemin en inspectant un nom de produit, stocké dans un a)
    const prix = dom.window.document.querySelectorAll("div.thumbnail > div.caption > h4.pull-right.price"); // Cherche les prix de produits (on voit le chemin en inspectant un prix de produit, stocké dans un span)
    const etoiles = dom.window.document.querySelectorAll("div.thumbnail > div.ratings > p:nth-child(2)"); // Cherche le nombre d'étoiles d'un produit (on voit le chemin en inspectant les étoiles, nombre stocké dans un p (data-rating))

    const data = []; // Création d'un tableau vide
    for (let i = 0; i < produits.length; i++) { // Création d'une boucle avec le nombre de produits total
        data.push({ // Ajout de données dans le tableau sous forme d'objets avec 1 titre, 1 prix et 1 note (nombre d'étoiles)
            produit: produits[i]["title"], // Récupère la valeur de "title" dans la balise <a ... title="...">
            prix: prix[i].textContent, // Récupère le texte entre la balise <h4 class="pull-right price">
            etoiles: etoiles[i].getAttribute("data-rating") // Récupère la valeur de "data-rating" dans la balise <p data-rating="...">
        });
    }
    return data;
}
webscrap2().then(data => console.log(data)); // Affichage du tableau avec node src/index.js

