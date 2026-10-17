// Page fiche d'un tracteur : tracteur.html?id=...
(function () {
  var id = new URLSearchParams(location.search).get("id");
  var t = (window.TRACTEURS || []).filter(function (x) { return x.id === id; })[0];
  var zone = document.getElementById("fiche");

  if (!t) {
    document.title = "Tracteur introuvable · Vieux Tracteurs";
    zone.innerHTML = '<p class="vide">Ce tracteur n\'est pas (encore) dans le catalogue. <a href="index.html">Retour au catalogue</a>.</p>';
    return;
  }

  var c = VT.constructeur(t.constructeur);
  var marque = c ? c.marque : "";
  var e = VT.echapper;
  document.title = marque + " " + t.modele + " · Vieux Tracteurs";

  // Nombres au format français : 4 156, 0,75.
  function nombre(v) {
    return typeof v === "number" ? v.toLocaleString("fr-FR") : v;
  }

  function valeur(v, unite) {
    if (v === "" || v == null) return '<span class="a-completer">à compléter</span>';
    return e(nombre(v)) + (unite ? " " + unite : "");
  }

  function liste(items) {
    return items && items.length
      ? "<ul>" + items.map(function (i) { return "<li>" + e(i) + "</li>"; }).join("") + "</ul>"
      : '<p class="a-completer">à compléter</p>';
  }

  function paragraphe(texte) {
    return texte ? "<p>" + e(texte) + "</p>" : '<p class="a-completer">à compléter</p>';
  }

  // Crédit d'une photo sous licence libre (champ credits : { chemin: { auteur, licence, page } }).
  function credit(chemin) {
    var cr = t.credits && t.credits[chemin];
    if (!cr) return "";
    return "Photo : " + e(cr.auteur) + " · " + e(cr.licence) +
      (cr.page ? ' · <a href="' + e(cr.page) + '" target="_blank" rel="noopener">Wikimedia Commons</a>' : "");
  }

  var photos = t.photos || [];
  var galerie = photos.length
    ? '<div class="galerie"><div class="principale"><img id="photo-principale" src="' + e(photos[0]) + '" alt="' + e(marque + " " + t.modele) + '"></div>' +
      '<p class="credit" id="credit-photo">' + credit(photos[0]) + "</p>" +
      (photos.length > 1
        ? '<div class="miniatures">' + photos.map(function (p, i) {
            return '<button type="button" data-src="' + e(p) + '" aria-current="' + (i === 0) + '" aria-label="Photo ' + (i + 1) + '">' +
              '<img src="' + e(VT.vignette(p)) + '" alt=""></button>';
          }).join("") + "</div>"
        : "") + "</div>"
    : "";

  var caracs = [
    ["Constructeur", c ? '<a href="constructeurs.html#' + e(c.id) + '">' + e(c.nom) + "</a>" : valeur("")],
    ["Pays", valeur(t.pays)],
    ["Période de production", valeur(VT.periode(t))],
    ["Puissance", valeur(t.puissance_ch, "ch")],
    ["Moteur", valeur(t.moteur)],
    ["Cylindres", valeur(t.cylindres)],
    ["Cylindrée", valeur(t.cylindree_cm3, "cm³")],
    ["Couple", valeur(t.couple_nm, "N·m")],
    ["Poids", valeur(t.poids_kg, "kg")]
  ].map(function (l) { return "<tr><th scope=\"row\">" + l[0] + "</th><td>" + l[1] + "</td></tr>"; }).join("");

  // Fiche technique détaillée : chaque ligne n'apparaît que si le champ est rempli.
  var DETAILS = [
    ["usine", "Usine"], ["serie", "Série"], ["nombre_produit", "Nombre produit"],
    ["alesage_course", "Alésage × course"], ["regime", "Régime"], ["refroidissement", "Refroidissement"],
    ["vitesses", "Boîte de vitesses"], ["vitesse_min_kmh", "Vitesse mini", "km/h"], ["vitesse_max_kmh", "Vitesse maxi", "km/h"],
    ["prise_de_force", "Prise de force"], ["relevage", "Relevage"], ["dimensions", "Dimensions"],
    ["pneus", "Pneumatiques"], ["reservoir_l", "Réservoir", "L"], ["prix_epoque", "Prix d'époque"],
    ["cote_collection", "Cote en collection"]
  ];
  var details = DETAILS.filter(function (d) { return t[d[0]] !== "" && t[d[0]] != null; }).map(function (d) {
    return "<tr><th scope=\"row\">" + d[1] + "</th><td>" + e(nombre(t[d[0]])) + (d[2] ? " " + d[2] : "") + "</td></tr>";
  }).join("");

  zone.innerHTML =
    '<p class="fil"><a href="index.html">Catalogue</a> › ' + e(marque) + " " + e(t.modele) + "</p>" +
    '<div class="fiche-entete"><h1>' + e(marque) + " " + e(t.modele) + "</h1>" +
    (t.surnom ? '<span class="surnom">« ' + e(t.surnom) + " »</span>" : "") + "</div>" +
    galerie +
    '<div class="fiche-grille"><div>' +
    "<h2>Histoire</h2>" + paragraphe(t.histoire) +
    (t.anecdote
      ? '<aside class="saviez"><h3>Le saviez-vous ?</h3>' + t.anecdote.split(/\n\s*\n/).map(function (p) {
          return "<p>" + e(p) + "</p>";
        }).join("") + "</aside>"
      : "") +
    "<h2>Réputation</h2>" + paragraphe(t.reputation) +
    (t.versions ? "<h2>Versions et évolutions</h2><p>" + e(t.versions) + "</p>" : "") +
    '<div class="qualites-defauts"><div><h3>Qualités</h3>' + liste(t.qualites) + "</div>" +
    "<div><h3>Défauts</h3>" + liste(t.defauts) + "</div></div>" +
    "</div><div><h2>Caractéristiques</h2><table class=\"caracs\">" + caracs + "</table>" +
    (details ? "<h3>Fiche technique détaillée</h3><table class=\"caracs\">" + details + "</table>" : "") +
    '<p class="aide">Une erreur ou une information à ajouter ? <a href="proposer.html?marque=' + encodeURIComponent(marque) + "&modele=" + encodeURIComponent(t.modele) + '">Proposez une correction</a>.</p>' +
    (c ? "<h2>Le constructeur</h2><h3>" + e(c.nom) + "</h3>" + paragraphe(c.histoire) +
      '<p><a href="constructeurs.html#' + e(c.id) + '">Tous les modèles ' + e(c.marque) + "</a></p>" : "") +
    "</div></div>" +
    (t.sources && t.sources.length
      ? '<section class="sources"><h2>Sources</h2><ul>' + t.sources.map(function (u) {
          return '<li><a href="' + e(u) + '" rel="noopener" target="_blank">' + e(u) + "</a></li>";
        }).join("") + "</ul></section>"
      : "") +
    '<section class="commentaires"><h2>Commentaires</h2><div id="giscus"></div></section>';

  zone.addEventListener("click", function (ev) {
    var b = ev.target.closest(".miniatures button");
    if (!b) return;
    document.getElementById("photo-principale").src = b.getAttribute("data-src");
    document.getElementById("credit-photo").innerHTML = credit(b.getAttribute("data-src"));
    zone.querySelectorAll(".miniatures button").forEach(function (x) { x.setAttribute("aria-current", x === b); });
  });

  VT.giscus(document.getElementById("giscus"), { terme: "tracteur-" + t.id });
})();
