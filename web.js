/* ===== Comportament comú de la web ===== */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var D = window.DADES || {};

  /* Tema clar o fosc */
  var tema = $("#tema");
  if (tema) tema.addEventListener("click", function () {
    var root = document.documentElement;
    var fosc = root.dataset.theme === "dark" || (!root.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    root.dataset.theme = fosc ? "light" : "dark";
    try { localStorage.setItem("tema-geganters", root.dataset.theme); } catch (e) {}
  });
  try { var t = localStorage.getItem("tema-geganters"); if (t) document.documentElement.dataset.theme = t; } catch (e) {}

  /* Menú mòbil */
  var burger = $("#burger"), menu = $("#menu");
  if (burger) burger.addEventListener("click", function () { var o = menu.classList.toggle("obert"); burger.setAttribute("aria-expanded", o); });

  /* Capçalera, moviment de la portada */
  var cap = $("#cap"), heroImg = $(".hero-img"), hero = $(".hero"), tick = false;
  function alScroll() {
    tick = false; var y = window.scrollY;
    if (cap) cap.classList.toggle("ombra", y > 8);
    if (heroImg && hero && !reduce) hero.style.setProperty("--py", Math.min(1, y / Math.max(1, hero.offsetHeight)).toFixed(3));
  }
  window.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(alScroll); } }, { passive: true });
  alScroll();

  /* Aparició en fer scroll */
  if (reduce || !("IntersectionObserver" in window)) { $$(".rv").forEach(function (n) { n.classList.add("in"); }); }
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    $$(".rv").forEach(function (n) { io.observe(n); });
  }

  /* Visor de fotos */
  var lb = $("#lb");
  if (lb) {
    var obre = function (b) {
      var im = $("img", b); $("#lb-img").src = b.dataset.gran || im.src; $("#lb-img").alt = im.alt;
      $("#lb-peu").textContent = b.dataset.peu || im.alt || "";
      if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
    };
    var tanca = function () { if (lb.close) lb.close(); else lb.removeAttribute("open"); };
    document.addEventListener("click", function (e) { var b = e.target.closest(".zoom"); if (b) obre(b); });
    lb.addEventListener("click", tanca); $("#lb-tanca").addEventListener("click", tanca);
  }

  /* Salts dins la pàgina dels gegants */
  var salts = $$(".salts a");
  if (salts.length && "IntersectionObserver" in window) {
    var map = {}; salts.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var ioS = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { salts.forEach(function (a) { a.classList.remove("actiu"); }); var a = map[e.target.id]; if (a) { a.classList.add("actiu"); var c = a.parentElement; if (c && c.scrollWidth > c.clientWidth) c.scrollLeft = a.offsetLeft - (c.clientWidth - a.offsetWidth) / 2; } } }); }, { rootMargin: "-35% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) ioS.observe(el); });
  }

  /* Agenda: calcula la propera vegada de cada data fixa */
  var fmtMes = new Intl.DateTimeFormat("ca-ES", { month: "short" });
  var fmtData = new Intl.DateTimeFormat("ca-ES", { day: "numeric", month: "long", year: "numeric" });
  var avui = new Date(); avui.setHours(0, 0, 0, 0);
  function esdeveniments() {
    var l = [];
    (D.fixes || []).forEach(function (f) {
      var d = new Date(avui.getFullYear(), f.mes - 1, f.dia); if (d < avui) d = new Date(avui.getFullYear() + 1, f.mes - 1, f.dia);
      l.push({ d: d, titol: f.titol, lloc: f.lloc, tipus: f.tipus, text: f.text });
    });
    (D.especials || []).forEach(function (x) { var p = x.data.split("-"); var d = new Date(+p[0], +p[1] - 1, +p[2]); if (d >= avui) l.push({ d: d, titol: x.titol, lloc: x.lloc, tipus: x.tipus, text: x.text }); });
    return l.sort(function (a, b) { return a.d - b.d; });
  }
  function targeta(e) {
    var dies = Math.round((e.d - avui) / 86400000);
    var falta = dies === 0 ? "Avui" : dies === 1 ? "Demà" : "Falten " + dies + " dies";
    return '<article class="esdev rv"><div class="data-bloc"><b>' + e.d.getDate() + "</b><span>" + esc(fmtMes.format(e.d).replace(".", "")) + "</span><small>" + e.d.getFullYear() + "</small></div>" +
      "<div><h3>" + esc(e.titol) + '</h3><div class="meta"><span>' + esc(fmtData.format(e.d)) + "</span><span>" + esc(e.lloc) + "</span><span>" + esc(e.tipus) + '</span></div><p class="d">' + esc(e.text) + '</p></div><div class="falten">' + falta + "</div></article>";
  }
  var agPer = $("#ag-llista");
  if (agPer) { agPer.innerHTML = esdeveniments().map(targeta).join(""); }
  var agIni = $("#ag-inici");
  if (agIni) { agIni.innerHTML = esdeveniments().slice(0, 3).map(targeta).join(""); }
  var durant = $("#durant-any");
  if (durant) durant.innerHTML = (D.durantAny || []).map(function (x) { return "<li><b>" + esc(x.titol) + ".</b> " + esc(x.text) + "</li>"; }).join("");

  /* Transparència */
  var eur = new Intl.NumberFormat("ca-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
  var tr = D.transparencia, cb = $("#comptes");
  if (tr && cb) {
    var max = Math.max(tr.ingressos.total, tr.despeses.total);
    var bloc = function (tit, o) {
      return '<div class="bloc-barres rv"><h3>' + tit + "<span>" + esc(eur.format(o.total)) + "</span></h3>" + o.linies.map(function (x) {
        return '<div class="barra"><div class="et"><span>' + esc(x.concepte) + "</span><b>" + esc(eur.format(x.import)) + '</b></div><div class="pista"><i data-w="' + (x.import / max * 100).toFixed(1) + '"></i></div></div>';
      }).join("") + "</div>";
    };
    cb.innerHTML = bloc("Ingressos " + tr.any, tr.ingressos) + bloc("Despeses " + tr.any, tr.despeses);
    var posa = function () { $$("i[data-w]", cb).forEach(function (i) { i.style.width = i.dataset.w + "%"; }); };
    if ("IntersectionObserver" in window && !reduce) { var ioB = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { posa(); ioB.disconnect(); } }); }, { threshold: 0.2 }); ioB.observe(cb); } else posa();
    var docs = $("#t-cos");
    if (docs) docs.innerHTML = tr.documents.map(function (d) {
      return "<tr><td><b>" + esc(d.titol) + "</b></td><td>" + esc(d.tipus) + "</td><td>" + esc(d.any) + "</td><td>" +
        (d.fitxer ? '<a class="obre" href="' + esc(d.fitxer) + '" target="_blank" rel="noopener">Obre el PDF</a>' : '<span class="sense">Disponible aviat</span>') + "</td></tr>";
    }).join("");
  }

  /* Botons de copiar */
  $$(".copia").forEach(function (b) {
    b.addEventListener("click", function () {
      var el = document.getElementById(b.dataset.copia), txt = el.textContent;
      var sel = function () { var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Seleccionat"; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { b.textContent = "Copiat"; }, sel); else sel();
      setTimeout(function () { b.textContent = "Copia"; }, 1800);
    });
  });
})();
