// Page constructeurs : une section par constructeur avec ses modèles du catalogue.
(function () {
  var e = VT.echapper;
  var constructeurs = (window.CONSTRUCTEURS || []).slice().sort(function (a, b) {
    return a.marque.localeCompare(b.marque, "fr");
  });

  document.getElementById("sommaire").innerHTML = constructeurs.map(function (c) {
    return '<a href="#' + e(c.id) + '">' + e(c.marque) + "</a>";
  }).join(" · ");

  document.getElementById("liste").innerHTML = constructeurs.map(function (c) {
    var modeles = (window.TRACTEURS || []).filter(function (t) { return t.constructeur === c.id; })
      .sort(function (a, b) { return a.modele.localeCompare(b.modele, "fr", { numeric: true }); });
    var dates = c.fondation ? (c.fin ? c.fondation + "–" + c.fin : "depuis " + c.fondation) : "";
    return '<section class="constructeur" id="' + e(c.id) + '">' +
      "<h2>" + e(c.nom) + "</h2>" +
      '<p class="meta">' + [c.pays, dates].filter(Boolean).map(e).join(" · ") + "</p>" +
      (c.histoire ? "<p>" + e(c.histoire) + "</p>" : '<p class="a-completer">Histoire à compléter.</p>') +
      (modeles.length
        ? "<h3>Modèles du catalogue</h3><ul class=\"liens-modeles\">" + modeles.map(function (t) {
            return '<li><a href="tracteur.html?id=' + encodeURIComponent(t.id) + '">' + e(t.modele) + "</a></li>";
          }).join("") + "</ul>"
        : "") +
      "</section>";
  }).join("");

  if (location.hash) {
    var cible = document.getElementById(location.hash.slice(1));
    if (cible) cible.scrollIntoView();
  }
})();
