import zxcvbn from 'zxcvbn';

export const passwordStrengthCheck = () => {
  let strength = {
    0: 'Worst',
    1: 'Bad',
    2: 'Weak',
    3: 'Good',
    4: 'Strong'
  };

  const password = document.getElementById('pass');
  const meter = document.getElementById('password-strength-meter');
  const strengthText = document.getElementById('password-strength-text');

  let val = password.value;

  if (!val) {
    meter.className = 'hide';
  }

  let result = zxcvbn(val);

  // Update the password strength meter
  switch (result.score) {
    case 0:
      meter.className = 'worst-meter';
      break;
    case 1:
      meter.className = 'bad-meter';
      break;
    case 2:
      meter.className = 'weak-meter';
      break;
    case 3:
      meter.className = 'good-meter';
      break;
    case 4:
      meter.className = 'strong-meter';
      break;
    default:
      meter.className = 'hide';
  }
  meter.value = result.score;

  // Update the text indicator
  if (val !== '') {
    strengthText.innerText = 'Password Strength: ' + strength[result.score];
  } else {
    strengthText.innerText = '';
  }
};
