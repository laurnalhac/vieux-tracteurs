// Page « Sélection années 70-80 » : dix tracteurs et la raison de leur choix.
(function () {
  var CHOIX = [
    ["john-deere-4440", "Le plus populaire de la série « Iron Horses » de John Deere, classé parmi les dix John Deere les plus vendus de l'histoire, avec plus de 13 000 exemplaires par an (TractorData, Green Magazine)."],
    ["john-deere-3130", "Le plus gros tracteur produit à Mannheim et le seul John Deere de moins de 100 ch à six cylindres ; environ 15 700 exemplaires (Traktorenlexikon, Southern Star)."],
    ["massey-ferguson-590", "Le plus gros MF de la série 500 construit en Angleterre, l'un des plus produits de la série ; un « classique à cabine très désirable » selon Tractor & Machinery."],
    ["fendt-favorit-614ls", "Six-cylindres turbo, coupleur Turbomatik et boîte ZF à étagement fin : l'archétype du gros tracteur haut de gamme allemand de la fin des années 70 (Traktorenlexikon, Southern Star)."],
    ["ford-7600", "Successeur turbo du Ford 7000, il a « établi la référence » des tracteurs de moyenne puissance et popularisé la cabine silencieuse Q (Southern Star, Agriland)."],
    ["deutz-dx-110", "La série DX est la dernière génération « purement mécanique » de Deutz et la première vendue sous le nom Deutz-Fahr ; le DX 110 avait l'un des relevages les plus puissants de son temps (Agriland, Koneviesti)."],
    ["fiat-880-dt", "Avec le 780, il inaugure en 1975 la série 80 de Fiat, présentée comme la première au monde à plateforme de conduite suspendue sur silentblocs, puis à cabine Pininfarina (Wikipédia)."],
    ["mercedes-mb-trac-1000", "Quatre roues égales, cabine centrale, 40 km/h : le MB-trac a popularisé le « tracteur système » et reste un tracteur culte (Farmers Journal)."],
    ["zetor-crystal-8011", "Présenté comme le premier tracteur conventionnel au monde conçu d'emblée avec une cabine de sécurité intégrée (Farmers Journal)."],
    ["renault-145-14-tx", "Vaisseau amiral de la série TX de 1981, qui a apporté à Renault sa première cabine silencieuse, encore utilisée en 2000 (Koneviesti, Wikipédia)."]
  ];
  var e = VT.echapper;
  var parId = {};
  (window.TRACTEURS || []).forEach(function (t) { parId[t.id] = t; });

  document.getElementById("selection").innerHTML = CHOIX.map(function (c) {
    var t = parId[c[0]];
    if (!t) return "";
    var cons = VT.constructeur(t.constructeur);
    var marque = cons ? cons.marque : "";
    var photo = t.photos && t.photos[0];
    return '<li><a class="carte selection-carte" href="tracteur.html?id=' + encodeURIComponent(t.id) + '">' +
      '<div class="vignette">' + (photo ? '<img src="' + e(VT.vignette(photo)) + '" alt="' + e(marque + " " + t.modele) + '" loading="lazy">' : "") + "</div>" +
      '<div class="corps"><span class="marque">' + e(marque) + "</span><h3>" + e(t.modele) + "</h3>" +
      '<p class="meta">' + e([t.pays, VT.periode(t), t.puissance_ch ? t.puissance_ch + " ch" : ""].filter(Boolean).join(" · ")) + "</p>" +
      "<p>" + e(c[1]) + "</p></div></a></li>";
  }).join("");
})();
