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

const scenarioData = {
  base: {
    wait: '6,89 min',
    text: 'Aktuálny stav podľa datasetu pred optimalizáciou.'
  },
  kiosk: {
    wait: '5,82 min',
    text: 'Jeden dodatočný McKiosk znižuje tlak na objednávku, ale kuchyňa stále ostáva výrazným zdrojom čakania.'
  },
  kitchen: {
    wait: '5,31 min',
    text: 'Jeden pracovník kuchyne zrýchli prípravu, no časť zákazníkov ešte čaká pri objednávaní.'
  },
  full: {
    wait: '4,61 min',
    text: 'McOptimalizácia z datasetu: kiosk aj kuchyňa sú posilnené a výdajový pult ostáva nezmenený.'
  }
};

const scenarioSelect = document.querySelector('#scenarioSelect');
const scenarioWait = document.querySelector('#scenarioWait');
const scenarioText = document.querySelector('#scenarioText');

scenarioSelect.addEventListener('change', () => {
  const selected = scenarioData[scenarioSelect.value];
  scenarioWait.textContent = selected.wait;
  scenarioText.textContent = selected.text;
});

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#151515',
        font: { weight: 'bold' }
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#151515' },
      grid: { display: false }
    },
    y: {
      beginAtZero: true,
      ticks: { color: '#151515' },
      grid: { color: 'rgba(21, 21, 21, 0.08)' }
    }
  }
};

if (window.Chart) {
  new Chart(document.querySelector('#customersChart'), {
    type: 'bar',
    data: {
      labels: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
      datasets: [{
        label: 'Počet zákazníkov',
        data: [74, 63, 61, 59, 65, 60, 55, 63],
        backgroundColor: '#d71920',
        borderRadius: 8
      }]
    },
    options: chartDefaults
  });

  new Chart(document.querySelector('#waitingChart'), {
    type: 'bar',
    data: {
      labels: ['Priemerné čakanie', 'Priemerný celkový čas', 'Využitie kuchyne', 'Využitie kioskov'],
      datasets: [
        {
          label: 'Pred optimalizáciou',
          data: [6.89, 17.88, 86, 73],
          backgroundColor: '#d71920',
          borderRadius: 8
        },
        {
          label: 'Po optimalizácii',
          data: [4.61, 14.12, 78, 64],
          backgroundColor: '#ffc72c',
          borderRadius: 8
        }
      ]
    },
    options: chartDefaults
  });
}
