const CHARACTERS = "0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

(function() {
  let rng = window.crypto || window.msCrypto;
  if (rng === undefined)
    return;

  console.log("upgrading to secure rng");
  Math.random = function() {
    return rng.getRandomValues(new Uint32Array(1))[0] / 4294967296;
  };
})();

function uniformGen(range) {
  let max = Math.floor(2**32 / range) * range;
  let x = max;

  do {
    x = Math.floor(Math.random() * 2**32);
  } while (x >= max);

  return (x % range);
}

function maybePush(myArray) {
  let char = CHARACTERS[uniformGen(CHARACTERS.length)];
  if (Math.random() >= 0.5) {
    return myArray.push(char)
  }
}

$.getJSON("/wordlist.json", function(wordlist) {
  let password = [];
  for (var i = 0; i < 4; i++) {
    let word = wordlist['words'][uniformGen(wordlist['words'].length)];
    password.push(word.charAt(0).toUpperCase() + word.slice(1));
    maybePush(password);
  }
  $('#password').html(password.join(''))
});
