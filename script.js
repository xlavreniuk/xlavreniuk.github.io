const datasetPreview = [
  ['1', '0 min', 'Pokladňa', 2, '3,34 min', '1,93 min'],
  ['2', '1 min', 'Kiosk', 1, '4,51 min', '3,50 min'],
  ['3', '1 min', 'Kiosk', 4, '6,42 min', '4,66 min'],
  ['4', '3 min', 'Kiosk', 6, '2,42 min', '1,55 min'],
  ['5', '3 min', 'Pokladňa', 1, '10,75 min', '8,53 min'],
  ['6', '4 min', 'Pokladňa', 1, '11,31 min', '8,49 min']
];

const rowsTarget = document.querySelector('#datasetRows');
datasetPreview.forEach((row) => {
  const tr = document.createElement('tr');
  tr.innerHTML = row.map((cell) => `<td>${cell}</td>`).join('');
  rowsTarget.appendChild(tr);
});

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const processDescriptions = {
  arrival: 'Príchod zákazníka: zákazník vstupuje do systému.',
  order: 'Objednávka: zákazník vytvorí objednávku pri kiosku alebo pokladni.',
  payment: 'Platba: zákazník zaplatí za objednávku.',
  kitchen: 'Príprava jedla: kuchyňa pripravuje objednávku.',
  pickup: 'Výdaj objednávky: zákazník prevezme hotové jedlo.',
  exit: 'Odchod zákazníka: zákazník opúšťa systém.'
};

const processDescription = document.querySelector('#processDescription');
document.querySelectorAll('.step-card[data-step]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.step-card[data-step]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    processDescription.textContent = processDescriptions[button.dataset.step];
  });
});
