// Formulaire « Proposer un tracteur » : ouvre une issue GitHub préremplie.
(function () {
  var form = document.getElementById("proposition");
  var params = new URLSearchParams(location.search);
  ["marque", "modele"].forEach(function (k) {
    if (params.get(k)) form.elements[k].value = params.get(k);
  });

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var d = {};
    Array.prototype.forEach.call(form.elements, function (el) { if (el.name) d[el.name] = el.value.trim(); });

    var titre = "Proposition : " + d.marque + " " + d.modele;
    var corps = [
      "**Marque :** " + d.marque,
      "**Modèle :** " + d.modele,
      "**Années de production :** " + (d.annees || "?"),
      "**Pays d'origine :** " + (d.pays || "?"),
      "**Puissance :** " + (d.puissance || "?"),
      "**Moteur :** " + (d.moteur || "?"),
      "",
      "**Informations :**",
      d.infos || "",
      "",
      "**Sources :**",
      d.sources || ""
    ].join("\n");

    var url = "https://github.com/" + window.CONFIG.depot + "/issues/new" +
      "?labels=proposition&title=" + encodeURIComponent(titre) + "&body=" + encodeURIComponent(corps);
    window.open(url, "_blank", "noopener");
  });
})();
