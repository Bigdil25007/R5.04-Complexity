// interface Artist {
//   id: string;
//   name: string;
// }

function findArtistIndex(artists, name) {
  for (let i = 0; i < artists.length; i++) {
    if (artists[i].name === name) {
      return artists[i].id;
    }
  }
  return -1;
}

/**
 * Puisque la liste est trié dans l'ordre alphabétique, on peut utiliser une recherche dichotomique pour trouver l'index de l'artiste.
 * On essaie de trouver l'index en divisant par deux "l'espace de recherche" à chaque tentative.
 */

function findArtistIndexOpti(artists, name) {
    let left = 0;
    let right = artists.length - 1;

    while (left <= right) {
        const pivot = Math.floor((left + right) / 2);
        if (artists[pivot].name === name) {
            return artists[pivot].id;
        } else if (artists[pivot].name < name) {
            left = pivot + 1;
        } else {
            right = pivot - 1;
        }
    }
    return -1;
}
//Complexité temporelle : O(log(n))
//Complexité spatiale : O(1)


////////////////////////////////////////////////

// interface Artist {
//   id: string;
//   name: string;
//   genre: string;
//   stage: string;
// }

// interface Stage {
//   id: string;
//   name: string;
//   genres: Array<string>;
// }

function assignStages(artists, stages) {
  for (let stage of stages) {
    for (let artist of artists) {
      if (stage.genres.includes(artist.genre)) {
        artist.stage = stage.id;
        break;
      }
    }
  }
}
// On boucle sur 2 listes différentes : complexité temporelle = O(n*m) avec n : nombre d'artistes et m : nombre de scènes

/**
 * Au lieu de boucler sur chaque scène pour chaque artiste (même ceux déjà assignés) on peut sauvegarder l'association entre un genre et sa scène dans une Map
 * On peut ensuite assigner directement la scène à l'artiste si le genre de l'artiste est dans la Map
 */

// n : nombre d'artistes et m : nombre de scènes
function assignStagesOpti(artists, stages) {
    const assocGenreStage = new Map(); // T : O(1) et S: O(m) space

    for (let stage of stages) { // T : O(m)
        for (let genre of stage.genres) { // T : O(g) --- g : nombre de genres par scène
            assocGenreStage.set(genre, stage.id); // T : O(1) et S : O(1)
        }
    }

    for (let artist of artists) { // T : O(n)
        if (assocGenreStage.has(artist.genre)) { // T : O(1)
            artist.stage = assocGenreStage.get(artist.genre); // T : O(1)
        }
    }
}
// Complexité temporelle : O(n + m)
// Complexité spatiale : O(m)

///////////////////////////////////////////////////


console.log("Creating data");

const genres = ["Rock", "Pop", "Jazz", "Classical", "Hip-Hop"];
const stages = ["scene1", "scene2", "scene3", "scene4", "scene5"];
const artists = ["artiste1", "artiste2", "artiste3", "artiste4", "artiste5"];

const artistList = artists.map((name, index) => ({
    id: `artist${index + 1}`,
    name: name,
    genre: genres[index % genres.length],
    stage: ""
}));

const stageList = stages.map((name, index) => ({
    id: `stage${index + 1}`,
    name: name,
    genres: [genres[index % genres.length]]
}));

console.log("data created\n\n");

let start = performance.now();
console.log(findArtistIndex(artistList, "artiste3"));
let end = performance.now();
console.log(`findArtistIndex took ${end - start} milliseconds\n`);

start = performance.now();
console.log(findArtistIndexOpti(artistList, "artiste3"));
end = performance.now();
console.log(`findArtistIndexOpti took ${end - start} milliseconds\n\n`);



start = performance.now();
assignStages(artistList, stageList);
end = performance.now();
console.log(`assignStages took ${end - start} milliseconds\n`);

start = performance.now();
assignStagesOpti(artistList, stageList);
end = performance.now();
console.log(`assignStagesOpti took ${end - start} milliseconds\n\n`);