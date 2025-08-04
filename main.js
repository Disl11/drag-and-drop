// Sélection de toutes les boîtes déplaçables
const boxes = document.querySelectorAll('.box');

// Sélection de toutes les zones de dépôt
const dropzones = document.querySelectorAll('.dropzone');

// Pour chaque boîte, on ajoute les événements liés au drag and drop
boxes.forEach(box => {

  // Début du drag : stocker l'id et cacher la boîte temporairement
  box.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id); // On stocke l'id
    setTimeout(() => {
      e.target.style.display = 'none'; // On cache l'élément pendant le drag
    }, 0);
  });

  // Fin du drag : rendre la boîte visible à nouveau
  box.addEventListener('dragend', (e) => {
    e.target.style.display = 'block';
  });

});

// Pour chaque zone de dépôt, gérer l'autorisation du drop et le dépôt
dropzones.forEach(zone => {

  // Quand un élément est au-dessus de la zone : autoriser le drop et changer le style
  zone.addEventListener('dragover', (e) => {
    e.preventDefault(); // Sans ça, le drop n'est pas autorisé
    zone.classList.add('dragover'); // Ajoute un style visuel
  });

  // Quand on sort de la zone sans déposer : enlever le style
  zone.addEventListener('dragleave', () => {
    zone.classList.remove('dragover');
  });

  // Quand on lâche la boîte sur la zone : récupérer l'élément et l'ajouter à la zone
  zone.addEventListener('drop', (e) => {
    e.preventDefault(); // Empêche le comportement par défaut

    zone.classList.remove('dragover'); // Enlève le style

    const id = e.dataTransfer.getData('text/plain'); // Récupère l'id de la boîte
    const draggable = document.getElementById(id); // Sélectionne la boîte

    if (draggable) {
      zone.appendChild(draggable); // Ajoute la boîte dans la zone de dépôt
    }
  });

});