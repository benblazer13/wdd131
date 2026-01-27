const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Pittsburgh Pennsylvania",
        location: "Pittsburgh, Pennsylvania, United States",
        dedicated: "2024, September, 15",
        area: 32240,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/pittsburgh-pennsylvania-temple/pittsburgh-pennsylvania-temple-60448-main.jpg"
    },
    {
        templeName: "Columbus Ohio",
        location: "Columbus, Ohio, United States",
        dedicated: "1999, September, 4",
        area: 11745,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/columbus-ohio-temple/columbus-ohio-temple-57341-main.jpg"
    },
    {
        templeName: "Palmyra New York",
        location: "Palmyra, New York, United States",
        dedicated: "2000, April, 6",
        area: 10900,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/_temp/077-Palmyra-New-York-Temple.jpg"
    },
];

const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
});

const container = document.querySelector("#temple-container");
const title = document.querySelector("#temple-title");

function displayTemples(filteredTemples) {
    container.innerHTML = "";

    filteredTemples.forEach(temple => {
        let card = document.createElement("section");
        card.className = "temple-card";

        card.innerHTML = `
            <h3>${temple.templeName}</h3>
            <p><span class="label">Location:</span> ${temple.location}</p>
            <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
            <p><span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft</p>
            <img src="${temple.imageUrl}" 
                 alt="${temple.templeName} Temple" 
                 loading="lazy" 
                 width="400" height="250">
        `;

        container.appendChild(card);
    });
}

displayTemples(temples);

document.querySelector("a[href='#home']").addEventListener("click", () => {
    title.textContent = "Home";
    displayTemples(temples);
});

document.querySelector("a[href='#old']").addEventListener("click", () => {
    title.textContent = "Old";
    displayTemples(temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900));
});

document.querySelector("a[href='#new']").addEventListener("click", () => {
    title.textContent = "New";
    displayTemples(temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000));
});

document.querySelector("a[href='#large']").addEventListener("click", () => {
    title.textContent = "Large";
    displayTemples(temples.filter(t => t.area > 90000));
});

document.querySelector("a[href='#small']").addEventListener("click", () => {
    title.textContent = "Small";
    displayTemples(temples.filter(t => t.area < 10000));
});