/* ===== Dades que canvien sovint =====
   Agenda i transparència. Edita només el que hi ha entre cometes i respecta les comes. */
window.DADES = {

  /* Dates que es repeteixen cada any. La web calcula sola la propera vegada. */
  fixes: [
    { mes: 5, dia: 10, titol: "Nit de Sant Anastasi", lloc: "Rambla, davant de Roca i Pi", tipus: "Festes de Maig",
      text: "L'Àliga fa el seu ball davant de Roca i Pi i després surt el Seguici de l'Àliga, amb torxes enceses, fins a la Rambla." },
    { mes: 5, dia: 11, titol: "Diada de Sant Anastasi", lloc: "Església de Santa Maria", tipus: "Festes de Maig",
      text: "Ofici Solemne de Sant Anastasi, amb l'Àliga i els gegants Anastasi i Maria." },
    { mes: 8, dia: 15, titol: "Festa Major · Santa Maria", lloc: "Església de Santa Maria i carrers de Badalona", tipus: "Festa Major",
      text: "Els gegants surten a la festa major i ballen el Ball de Santa Maria durant les ofrenes de l'Ofici." },
    { mes: 9, dia: 11, titol: "Diada Nacional de Catalunya", lloc: "Plaça de la Plana", tipus: "Diada",
      text: "L'Àliga fa el seu ball a la plaça de la Plana." }
  ],

  /* Sortides concretes d'aquest any. Una línia per esdeveniment, data en format AAAA-MM-DD.
     Exemple (esborra els // del davant per activar-lo):
     { data: "2027-05-08", titol: "Badagegants", lloc: "La Plana", tipus: "Trobada", text: "Trobada de gegants a Badalona." }, */
  especials: [
  ],

  /* Activitats que tenen lloc durant l'any sense una data fixa */
  durantAny: [
    { titol: "Pregó de les Festes de Maig", text: "L'Àliga fa el seu ball el dia del pregó, amb música de la Banda Simfònica de Badalona." },
    { titol: "Processó del Corpus", text: "L'Àliga hi participa durant el mes de juny." },
    { titol: "Badagegants", text: "Trobada de gegants a Badalona. Cada any desenes de gegants vinguts d'arreu ballen el «Renaixement Gegant»." },
    { titol: "Assajos", text: "Al local de la colla, a la Masia de Can Canyadó. Tothom qui vulgui provar-ho és benvingut." }
  ],

  /* Transparència: comptes de l'any. Els imports són en euros. */
  transparencia: {
    any: 2025,
    ingressos: {
      total: 50710.23,
      linies: [
        { concepte: "Ajuntament de Badalona · Subvenció nominativa (Cicle festiu)", import: 38000.00 },
        { concepte: "Ajuntament de Badalona · Subvenció de concurrència competitiva (difusió de les figures de goma de la Badamar i l'Anastasi)", import: 4400.00 },
        { concepte: "Diputació de Barcelona · Subvenció de cultura", import: 1011.00 },
        { concepte: "Ingressos extraordinaris", import: 7299.23 }
      ]
    },
    despeses: {
      total: 50710.23,
      linies: [
        { concepte: "Despeses de la subvenció nominativa (Cicle festiu)", import: 38056.20 },
        { concepte: "Difusió de les figures de la Badamar i l'Anastasi", import: 9711.53 },
        { concepte: "Restauració i promoció dels gegants petits de la ciutat", import: 1140.90 }
      ]
    },
    /* Documents. Per enllaçar un PDF, posa'l a la carpeta docs/ i escriu "docs/nom.pdf" a fitxer. */
    documents: [
      { titol: "Certificat de transparència 2025", tipus: "Certificat", any: 2025, fitxer: "" }
    ]
  }
};
