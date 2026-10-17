// En-tête, pied de page et petites fonctions partagées par toutes les pages.
(function () {
  var PAGES = [
    ["index.html", "Catalogue"],
    ["constructeurs.html", "Constructeurs"],
    ["selection-70-80.html", "Sélection 70-80"],
    ["technique-moteur.html", "Technique"],
    ["proposer.html", "Proposer un tracteur"]
  ];

  var courante = location.pathname.split("/").pop() || "index.html";
  if (courante === "tracteur.html") courante = "index.html";
  if (courante === "technique-relevage.html") courante = "technique-moteur.html";

  var nav = PAGES.map(function (p) {
    var actif = p[0] === courante ? ' aria-current="page"' : "";
    return '<a href="' + p[0] + '"' + actif + ">" + p[1] + "</a>";
  }).join("");

  var entete = document.getElementById("entete");
  if (entete) {
    entete.className = "entete";
    entete.innerHTML =
      '<div class="conteneur">' +
      '<a class="logo" href="index.html"><img src="assets/img/logo.svg" alt="" width="56" height="56">' +
      '<span><span class="marque-titre">Vieux Tracteurs</span><small>Catalogue de référence</small></span></a>' +
      '<nav class="nav" aria-label="Navigation principale">' + nav + "</nav></div>";
  }

  var pied = document.getElementById("pied");
  if (pied) {
    pied.className = "pied";
    pied.innerHTML =
      '<div class="conteneur">Vieux Tracteurs · catalogue collaboratif de tracteurs anciens. ' +
      "Photos prises à Tractomania, Caussade, 2026. " +
      '<a href="proposer.html">Proposer une correction ou un tracteur</a>.</div>';
  }
})();

var VT = {
  echapper: function (texte) {
    return String(texte == null ? "" : texte).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  },

  constructeur: function (id) {
    return (window.CONSTRUCTEURS || []).filter(function (c) { return c.id === id; })[0] || null;
  },

  periode: function (t) {
    if (t.debut && t.fin) return t.debut === t.fin ? String(t.debut) : t.debut + "–" + t.fin;
    if (t.debut) return "à partir de " + t.debut;
    return "";
  },

  vignette: function (chemin) {
    return chemin ? chemin.replace("assets/img/tracteurs/", "assets/img/tracteurs/vignettes/") : "";
  }
};
