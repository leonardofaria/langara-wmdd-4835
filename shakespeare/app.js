// inspired by module pattern:
// https://css-tricks.com/how-do-you-structure-javascript-the-module-pattern-edition/

var util = {
  highlight: function(el) {
    el.classList.add('highlight');
    // remove the highlight class
    window.setTimeout(function(){
      el.classList.remove('highlight');
    }, 1000);
  }
};

var game = {

  ui: {
    helpBtn: document.querySelector('.helpBtn'),
    total_right: document.querySelector('.total_right'),
    total_questions: document.querySelector('.total_questions'),
    instructions: document.querySelector('.instructions-text'),
    closeBtn: document.querySelector('.closeBtn')
  },

  random: function(max) {
    return Math.floor(Math.random() * max);
  },

  init: function() {
    this.bindUIActions();
  },

  // TODO: break into small functions
  generateChallenge: function(el) {
    var quotes = el.querySelectorAll('dd');
    var caracters = el.querySelectorAll('dt');
    var random_number = game.random(quotes.length);
    var result = el.parentNode.querySelector('span');
    console.log('generateChallenge: random_number: ' + random_number);

    // hide all quotes
    [].forEach.call(quotes, function (dd) {
      dd.style.display = 'none';
    });
    quotes[random_number].style.display = 'block';
    quotes[random_number].classList.add('highlight');

    [].forEach.call(caracters, function (dt) {
      dt.addEventListener('click', function effect() {
        var index = [].indexOf.call(caracters, this);
        var total_questions = parseInt(game.ui.total_questions.innerHTML) + 1;
        game.ui.total_questions.innerHTML = total_questions;

        console.log('choosen: ' + index + ' - correct: ' + random_number);
        if (index === random_number) {
          var total_right = parseInt(game.ui.total_right.innerHTML) + 1;
          game.ui.total_right.innerHTML = total_right;
          util.highlight(game.ui.total_right);
          result.innerHTML = 'High five!';
        } else {
          util.highlight(game.ui.total_questions);
          result.innerHTML = 'FAIL!';
        }
        util.highlight(result);

        random_number = game.random(quotes.length);
        console.log('generateChallenge: random_number: ' + random_number);

        // hide all quotes
        [].forEach.call(quotes, function (dd) {
          dd.style.display = 'none';
        });
        quotes[random_number].style.display = 'block';
        quotes[random_number].classList.add('highlight');

        /*
        [].forEach.call(caracters, function (dt2) {
          dt2.removeEventListener('click', effect, false);
        });
        */

      }, false);
    });
  },

  bindUIActions: function() {
    var random = this.random;

    game.ui.helpBtn.addEventListener('click', function(){
      game.ui.instructions.classList.add('active');
    });

    game.ui.closeBtn.addEventListener('click', function(){
      game.ui.instructions.classList.remove('active');
    });

    var sections = document.querySelectorAll('.menu-section dl');
    [].forEach.call(sections, function (el) {
      game.generateChallenge(el);
    });
  }

};

var insults = {

  adjectives: ["artless","bawdy","beslubbering","bootless","brutish","churlish","cockered","clouted","craven","currish","dankish","dissembling","droning","errant","fawning","fobbing","froward","frothy","gleeking","goatish","gorbellied","impertinent","infectious","jarring","loggerheaded","lumpish","mammering","mangled","mewling","paunchy","pribbling","puking","puny","quailing","rank","reeky","roguish","ruttish","saucy","spleeny","spongy","surly","tottering","unmuzzled","vain","venomed","villainous","warped","wayward","weedy","yeasty","base-court","bat-fowling","beef-witted","beetle-headed","boil-brained","clapper-clawe","clay-brained","common-kissing","crook-pated","dismal-dreaming","dizzy-eyed","doghearted","dread-bolted","earth-vexing","elf-skinned","fat-kidneyed","fen-sucked","flap-mouthed","fly-bitten","folly-fallen","fool-born","full-gorged","guts-griping","half-faced","hasty-witted","hedge-born","hell-hated","idle-headed","ill-breeding","ill-nurtured","knotty-pated","milk-livered","motley-minded","onion-eyed","plume-plucked","pottle-deep","pox-marked","reeling-ripe","rough-hewn","rude-growing","rump-fed","shard-borne","sheep-biting"],

  nouns: ["apple-john", "baggage", "barnacle", "bladder", "boar-pig", "bugbear", "bum-bailey", "canker-blossom", "clack-dish", "clotpole", "coxcomb", "codpiece", "death-token", "dewberry", "flap-dragon", "flax-wench", "flirt-gill", "foot-licker", "fustilarian", "giglet", "gudgeon", "haggard", "harpy", "hedge-pig", "horn-beast", "hugger-mugger", "jolthead", "lewdster", "lout", "maggot-pie", "malt-worm", "mammet", "measle", "minnow", "miscreant", "moldwarp", "mumble-news", "nut-hook", "pigeon-egg", "pignut", "puttock", "pumpion", "ratsbane", "scut", "skainsmate"],

  insultBtn: document.querySelector('.insultBtn'),
  insultHolder: document.querySelector('.insultHolder'),

  random: function(max) {
    return Math.floor(Math.random() * max) + 1;
  },

  init: function() {
    this.bindUIActions();
  },

  bindUIActions: function() {
    var game = this.game;
    var insults = this;

    insults.insultBtn.addEventListener('click', function(){
      var adjectives = insults.adjectives;
      var nouns = insults.nouns;

      // get the first adjective
      var adjective1 = adjectives[insults.random(adjectives.length)];

      // remove the adjective from the array to avoid repetition
      adjectives = adjectives.filter(function(i) {
        return i != adjective1;
      });

      // get the second adjective
      var adjective2 = adjectives[insults.random(adjectives.length)];

      // get the noum
      var noun = nouns[insults.random(nouns.length)];

      var article = 'a';
      var initial = adjective1.charAt(0);
      if (initial === 'a' || initial === 'i' || initial === 'o' || initial === 'u') {
        article = 'an';
      }

      var insult = 'Thou art ' + article + ' ' + adjective1 + ' and ' + adjective2 + ' ' + noun;

      insults.insultHolder.style.display = 'block';
      insults.insultHolder.innerHTML = insult;
      util.highlight(insults.insultHolder);
      this.innerHTML = 'How about another?';
    });

    var accordion_items = document.querySelectorAll('h2');
    [].forEach.call(accordion_items, function (el) {
      el.addEventListener('click', function() {
        var dl = el.nextElementSibling;
        dl.classList.toggle('active');
      }, false);
    });
  }

};

game.init();
insults.init();
