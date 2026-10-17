// Page catalogue : grille de cartes et filtres reflétés dans l'URL.
(function () {
  var tracteurs = window.TRACTEURS || [];
  var champs = {
    q: document.getElementById("f-q"),
    marque: document.getElementById("f-marque"),
    decennie: document.getElementById("f-decennie"),
    pays: document.getElementById("f-pays"),
    puissance: document.getElementById("f-puissance")
  };
  var grille = document.getElementById("grille");
  var compteur = document.getElementById("compteur");

  var TRANCHES = [
    ["0-19", "Moins de 20 ch", 0, 19.99],
    ["20-34", "20 à 34 ch", 20, 34.99],
    ["35-49", "35 à 49 ch", 35, 49.99],
    ["50+", "50 ch et plus", 50, Infinity]
  ];

  function marqueDe(t) {
    var c = VT.constructeur(t.constructeur);
    return c ? c.marque : "";
  }

  function uniques(liste) {
    return liste.filter(function (v, i) { return v && liste.indexOf(v) === i; }).sort(function (a, b) {
      return String(a).localeCompare(String(b), "fr");
    });
  }

  function remplir(select, valeurs, libelle) {
    valeurs.forEach(function (v) {
      var o = document.createElement("option");
      o.value = Array.isArray(v) ? v[0] : v;
      o.textContent = libelle ? libelle(v) : v;
      select.appendChild(o);
    });
  }

  remplir(champs.marque, uniques(tracteurs.map(marqueDe)));
  remplir(champs.decennie, uniques(tracteurs.map(function (t) {
    return t.debut ? Math.floor(t.debut / 10) * 10 : null;
  })), function (d) { return "Années " + d; });
  remplir(champs.pays, uniques(tracteurs.map(function (t) { return t.pays; })));
  remplir(champs.puissance, TRANCHES, function (t) { return t[1]; });

  // Lecture des filtres depuis l'URL.
  var params = new URLSearchParams(location.search);
  Object.keys(champs).forEach(function (k) {
    if (params.has(k)) champs[k].value = params.get(k);
  });

  function normaliser(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function correspond(t, f) {
    if (f.marque && marqueDe(t) !== f.marque) return false;
    if (f.pays && t.pays !== f.pays) return false;
    if (f.decennie && (!t.debut || Math.floor(t.debut / 10) * 10 !== Number(f.decennie))) return false;
    if (f.puissance) {
      var tr = TRANCHES.filter(function (x) { return x[0] === f.puissance; })[0];
      if (!tr || t.puissance_ch == null || t.puissance_ch < tr[2] || t.puissance_ch > tr[3]) return false;
    }
    if (f.q) {
      var texte = normaliser([marqueDe(t), t.modele, t.surnom, t.pays, t.moteur, t.histoire].join(" "));
      var mots = normaliser(f.q).split(/\s+/).filter(Boolean);
      for (var i = 0; i < mots.length; i++) if (texte.indexOf(mots[i]) === -1) return false;
    }
    return true;
  }

  function carte(t) {
    var marque = marqueDe(t);
    var photo = t.photos && t.photos[0];
    var lignes = [
      ["Pays", t.pays],
      ["Période", VT.periode(t)],
      ["Puissance", t.puissance_ch != null ? t.puissance_ch + " ch" : ""],
      ["Cylindres", t.cylindres]
    ].map(function (l) {
      return "<dt>" + l[0] + "</dt><dd>" + (l[1] !== "" && l[1] != null ? VT.echapper(l[1]) : '<span class="a-completer">à compléter</span>') + "</dd>";
    }).join("");
    return '<a class="carte" href="tracteur.html?id=' + encodeURIComponent(t.id) + '">' +
      '<div class="vignette">' +
      (photo ? '<img src="' + VT.echapper(VT.vignette(photo)) + '" alt="' + VT.echapper(marque + " " + t.modele) + '" loading="lazy">' : "") +
      "</div>" +
      '<div class="corps"><span class="marque">' + VT.echapper(marque) + "</span>" +
      "<h3>" + VT.echapper(t.modele) + "</h3><dl>" + lignes + "</dl></div></a>";
  }

  function rendre() {
    var f = {};
    Object.keys(champs).forEach(function (k) { f[k] = champs[k].value.trim(); });

    var p = new URLSearchParams();
    Object.keys(f).forEach(function (k) { if (f[k]) p.set(k, f[k]); });
    var qs = p.toString();
    history.replaceState(null, "", qs ? "?" + qs : location.pathname);

    var liste = tracteurs.filter(function (t) { return correspond(t, f); }).sort(function (a, b) {
      return (marqueDe(a) + a.modele).localeCompare(marqueDe(b) + b.modele, "fr", { numeric: true });
    });
    compteur.textContent = liste.length + (liste.length > 1 ? " tracteurs" : " tracteur") + " sur " + tracteurs.length;
    grille.innerHTML = liste.length
      ? liste.map(carte).join("")
      : '<p class="vide">Aucun tracteur ne correspond à ces filtres.</p>';
  }

  Object.keys(champs).forEach(function (k) {
    champs[k].addEventListener("input", rendre);
    if (k !== "q") champs[k].addEventListener("change", rendre);
  });
  document.getElementById("f-effacer").addEventListener("click", function () {
    Object.keys(champs).forEach(function (k) { champs[k].value = ""; });
    rendre();
  });

  rendre();
})();
