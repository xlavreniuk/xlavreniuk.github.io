const datasetPreview = [
  ['001', '08:03', 'Menu', 4, '11,4 min', '7,2 min'],
  ['002', '08:07', 'Nápoj + snack', 2, '6,8 min', '4,1 min'],
  ['003', '08:15', 'Menu', 5, '13,2 min', '8,4 min'],
  ['004', '08:24', 'Dezert', 1, '4,9 min', '3,0 min'],
  ['005', '08:39', 'Rodinná objednávka', 8, '18,6 min', '11,7 min'],
  ['006', '09:02', 'Menu', 3, '10,1 min', '6,4 min']
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

new Chart(document.querySelector('#customersChart'), {
  type: 'bar',
  data: {
    labels: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    datasets: [{
      label: 'Počet zákazníkov',
      data: [42, 48, 55, 73, 96, 84, 61, 41],
      backgroundColor: '#c9162e',
      borderRadius: 8
    }]
  },
  options: chartDefaults
});

new Chart(document.querySelector('#waitingChart'), {
  type: 'line',
  data: {
    labels: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    datasets: [
      {
        label: 'Pred optimalizáciou',
        data: [8.5, 9.1, 10.4, 13.8, 18.2, 15.7, 11.9, 9.3],
        borderColor: '#c9162e',
        backgroundColor: 'rgba(201, 22, 46, 0.12)',
        tension: 0.35,
        fill: true
      },
      {
        label: 'Po optimalizácii',
        data: [5.6, 6.0, 6.7, 8.3, 10.9, 9.4, 7.2, 5.9],
        borderColor: '#151515',
        backgroundColor: 'rgba(255, 207, 50, 0.35)',
        tension: 0.35,
        fill: true
      }
    ]
  },
  options: chartDefaults
});
