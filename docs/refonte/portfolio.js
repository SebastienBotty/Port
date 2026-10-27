const projects = {
  checkcar: {name:'CheckCar',kind:'Projet client / Application web',image:'checkcar.png',description:"Une application qui transforme les informations d'un véhicule d'occasion en guide PDF personnalisé pour son futur acheteur.",role:"Développement full stack de l'application, de l'interface aux services qui génèrent les guides.",delivery:'Saisie des informations du véhicule, paiement Stripe, génération de documents avec l’IA et interface d’administration.',stack:'Next.js · TypeScript · PostgreSQL · Stripe · OpenAI',url:'https://www.checkcar.be/'},
  undercover: {name:'Undercover',kind:'Projet personnel / Jeu multijoueur',image:'undercover.png',description:'Un jeu de déduction sociale en temps réel. Des mots, des indices et un joueur qui essaie de passer inaperçu.',role:'Développement du jeu web : logique des rôles, déroulement des manches et synchronisation des joueurs.',delivery:'Salles multijoueurs, attribution des rôles, tours d’indices et variantes de jeu.',stack:'Application web · Logique de jeu · Temps réel'},
  tou: {name:'Tou',kind:'Projet personnel / Application mobile privée',image:'Tou-image.png',description:"Une application privée pour retrouver mes amis quand on sort. Une carte partagée, des points de rendez-vous et la position de chacun.",role:'Développement de l’application mobile et du backend, avec accès limité aux utilisateurs autorisés.',delivery:'Positions en temps réel, création de points de rendez-vous et notifications pour se rejoindre.',stack:'React Native · TypeScript · Node.js · MongoDB · Socket.io · Firebase'},
  europe: {name:'Commission européenne',kind:'Mission frontend / via WMH Project · 2026',description:'Développement de pages multilingues pour une plateforme de la Commission européenne, dans le cadre d’une mission via WMH Project de mars à juillet 2026.',role:'Intégration frontend de pages de la plateforme, dans le respect des directives de contenu, d’accessibilité et de localisation.',delivery:'Des pages en plusieurs langues intégrées au sein du projet. Le visuel de cette maquette est une composition typographique, pas une capture de la plateforme.',stack:'HTML · CSS · JavaScript'}
};
const cards = [...document.querySelectorAll('.object')];
const dialog = document.getElementById('project-dialog');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let active = 0;
let opener = null;

function showProject(key, source) {
  const project = projects[key];
  if (!project) return;
  opener = source;
  for (const [id, value] of Object.entries({title:project.name,kind:project.kind,description:project.description,role:project.role,delivery:project.delivery,stack:project.stack})) {
    document.getElementById('dialog-' + id).textContent = value;
  }
  const picture = document.getElementById('dialog-image');
  picture.hidden = !project.image;
  if (project.image) {
    picture.src = '../../public/images/' + project.image;
    picture.alt = 'Aperçu du projet ' + project.name;
  } else {
    picture.removeAttribute('src');
    picture.alt = '';
  }
  const link = document.getElementById('dialog-link');
  link.hidden = !project.url;
  if (project.url) link.href = project.url;
  else link.removeAttribute('href');
  dialog.showModal();
  dialog.scrollTop = 0;
}

function selectProject(index) {
  active = (index + cards.length) % cards.length;
  cards.forEach((card, index) => {
    const slot = (index - active + cards.length) % cards.length;
    card.dataset.slot = slot;
    card.setAttribute('aria-label', slot === 0 ? 'Ouvrir ' + projects[card.dataset.project].name : 'Mettre ' + projects[card.dataset.project].name + ' au premier plan');
  });
  document.getElementById('active-project').textContent = projects[cards[active].dataset.project].name;
  document.getElementById('scene-count').textContent = String(active + 1).padStart(2,'0') + ' / 03';
}

cards.forEach((card,index) => card.addEventListener('click', () => index === active ? showProject(card.dataset.project,card) : selectProject(index)));
document.getElementById('previous').addEventListener('click', () => selectProject(active - 1));
document.getElementById('next').addEventListener('click', () => selectProject(active + 1));
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => showProject(button.dataset.open,button)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { if (opener) opener.focus({preventScroll:true}); });
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

const scene = document.querySelector('.scene');
const orbit = document.querySelector('.scene-orbit');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
let frame = 0;
scene.addEventListener('pointermove', event => {
  if (reduced.matches || !finePointer.matches) return;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const rect = scene.getBoundingClientRect();
    orbit.style.setProperty('--rx', ((.5 - (event.clientY - rect.top) / rect.height) * 9) + 'deg');
    orbit.style.setProperty('--ry', (((event.clientX - rect.left) / rect.width - .5) * 10) + 'deg');
  });
});
scene.addEventListener('pointerleave', () => {
  cancelAnimationFrame(frame);
  orbit.style.setProperty('--rx','0deg');
  orbit.style.setProperty('--ry','0deg');
});
if (!reduced.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  }), {threshold:.08});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.documentElement.classList.add('motion-ready');
}
