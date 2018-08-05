life = 5;
score = 0;
body = document.getElementsByTagName('body')[0];
body.onkeydown = function(e) {
  if (e.code == "ArrowLeft") {
    btn_left.click();
  }
  if (e.code == "ArrowRight") {
    btn_right.click();
  }
}

function startGame() {
  num = game_number.value;
  hide(home);
  play.style.display = 'flex';
  fallingslowly();
}


function hide(box) {
  box.style.display = 'none';
}

function walk(side) {
  master_x = parseInt(m.getAttribute('x'));
  var newwalk = master_x + side;
  if (newwalk > 0 && newwalk < 6) {
    m.setAttribute('x', master_x + side);
  }
}

function ran(max) {
  return Math.floor(Math.random() * max) + 1;
}

function fallingslowly() {
  falling = setInterval(function() {
    birthofmonster();
    var monster = document.querySelectorAll('mon');
    for (var i = 0; i < monster.length; i++) {
      var newy = gravity(monster[i]);
      if (newy < 9) {
        monster[i].setAttribute('y', newy);
      } else {
        monster[i].outerHTML = "";
      }
    }
    catchMonster();
  }, 1000);
}


function gravity(mon) {
  var thisy = mon.getAttribute('y');
  var newy = parseInt(thisy) + 1;
  return newy;
}

function birthofmonster() {
  var babymonster = document.createElement("MON");
  var maxnum = num * 12;
  babymonster.innerText = ran(maxnum);
  babymonster.setAttribute('y', 0);
  babymonster.setAttribute('x', ran(5));
  monster.appendChild(babymonster);
}

function stopFalling() {
  clearInterval(falling)
}

function catchMonster() {
  masterX = parseInt(m.getAttribute('x'));
  lastMon = document.querySelector('mon[y="7"]');
  lastMonX = parseInt(lastMon.getAttribute('x'));
  if (lastMonX == masterX) {
	lastMon.classList.add('moncatch');
    lastMonValue = parseInt(lastMon.innerText);
    checkScore(lastMonValue);
  }
}

function checkScore(theLastMon) {
  if (theLastMon % num == 0) {
		correct();
  } else {
		wrong();
  }
}

function wrong(){
	life = life-1;
	document.querySelectorAll('.life')[0].outerHTML = "";
	if(life==0){
	stopFalling();
	thelife.innerText = "Game Over."
	}
}

function correct(){
	score = score+1;
	thescore.innerText = score;
}
