$.getJSON("/wordlist.json", function(wordlist) {
  password = [];
  for (var i = 0; i < 3; i++) {
    word = wordlist['words'][Math.floor(Math.random() * wordlist['words'].length)];
    password[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }
  password.push(Math.floor(Math.random() * 10));
  $('#password').html(password.join(''))
});
