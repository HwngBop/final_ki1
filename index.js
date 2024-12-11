document.getElementById('roll-button').addEventListener('click', () => {
    const results = document.querySelectorAll('.kq123');
    const images = ['bau.png', 'cua.png', 'tom.png', 'ca.png', 'huou.png', 'ga.png'];
    const labels = {
        'bau': 'Bầu',
        'cua': 'Cua',
        'tom': 'Tôm',
        'ca': 'Cá',
        'huou': 'Nai',
        'ga': 'Gà'
    };

    
    const kq = [];
    for (let i = 0; i < 3; i++) {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        results[i].src = randomImage;
        kq.push(randomImage.split('.')[0]);  
    }

    
    checkResults(labels, kq);
});

const betItems = document.querySelectorAll('.cuoc6');
let totalBet = 0;
let userBets = {
    'Bầu': 0,
    'Cua': 0,
    'Tôm': 0,
    'Cá': 0,
    'Nai': 0,
    'Gà': 0
};


betItems.forEach(item => {
  item.addEventListener('click', () => {
    let currentBet = parseInt(item.getAttribute('data-bet'));

    if (totalBet < 3) {
      if (currentBet < 3) {
        currentBet++; 
        totalBet++;

        item.setAttribute('data-bet', currentBet);
        item.querySelector('p').textContent = currentBet;

        
        const itemText = item.querySelector('img').alt;
        userBets[itemText] = currentBet;
      }
    } else {
      alert("Bạn đã vượt quá điểm cược ==");
    }
  });
});


const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => {
  totalBet = 0;
  userBets = {
    'Bầu': 0,
    'Cua': 0,
    'Tôm': 0,
    'Cá': 0,
    'Nai': 0,
    'Gà': 0
  };

  betItems.forEach(item => {
    item.setAttribute('data-bet', '0'); 
    item.querySelector('p').textContent = '0'; 
  });

  alert("Hì hì, điểm của bạn đã được đặt lại =)))");
});


function checkResults(labels, kq) {
  
  const spinCount = {
    'Bầu': 0,
    'Cua': 0,
    'Tôm': 0,
    'Cá': 0,
    'Nai': 0,
    'Gà': 0
  };


  kq.forEach(result => {
    const label = labels[result];  
    if (label) spinCount[label]++;
  });

  
  let correct = true;
  let resultMessage = "";

  
  for (let bet in userBets) {
    if (userBets[bet] > 0) {
      const betCount = spinCount[bet];
      if (betCount !== userBets[bet]) {
        correct = false;
        break;
      }
    }
  }

  
  if (correct) {
    resultMessage = "Bạn đã đoán đúng với kết quả: " + 
      Object.keys(spinCount).map(key => `${key}: ${spinCount[key]}`).join(" ");
  } else {
    resultMessage = "Bạn đã đoán sai với kết quả: " + 
      Object.keys(spinCount).map(key => `${key}: ${spinCount[key]}`).join(" ");
  }

  
  console.log(resultMessage);
}
