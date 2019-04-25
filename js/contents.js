// build headers for requests
function buildHeader() {
  var head = new Headers();
  head.append('pragma', 'no-cache');
  head.append('cache-control', 'no-cache');

  var init = {
    method: 'GET',
    headers: head
  };
  return init;
}

function expandGroups(event) {
  var els = document.getElementsByClassName('title');
  if (event === 'touchend') {
    event.preventDefault();
  }
  Array.prototype.forEach.call(els, function(el) {
    el.addEventListener(event, function () {
      el.parentElement.classList.toggle('expand');
      if(el.classList.contains('flash')) {
        el.classList.remove('flash');
      }
    }, false);
  });
}

// pull highlights content
function pullHighlights() {
  return fetch('contents/experience.json', buildHeader()).then(function(response) {
    return response.json();
  });
}

// pull organizations links
function pullOrg() {
  return fetch('contents/org.json', buildHeader()).then(function(response) {
    return response.json();
  });
}

function highlights() {
  var h = document.getElementById('highlights');
  pullHighlights().then(function(r) {
    document.getElementsByClassName('loading')[0].classList.add('hide');
    r.data.forEach(function (x) {
      h.innerHTML += '<li class="' + x.type +
        '"><div class="left">' + x.date +
        '</div><div class="desc"><div>' + x.description.what + ' ' +
        '<em>' + x.description.emphasis + '</em></div><div class="info">' +
        x.description.info + '</div></div></li>';
    });
  });
}


function org() {
  var h = document.getElementById('press');
  pullOrg().then(function(r) {
    document.getElementsByClassName('loading')[1].classList.add('hide');
    r.data.forEach(function (x) {
      h.innerHTML += '<li class="' + x.type +
        '"><div class="left">' + x.date +
        '</div><div class="desc"><div>' + x.description.what + ' ' +
        '<em>' + x.description.emphasis + '</em></div><div class="info">' +
        x.description.info + '</div></div></li>';
    });
  });
}

// get all the contents infomation 
(function () {
  window.addEventListener('load', function() {
    highlights();
    org();
    expandGroups('click');
    expandGroups('touchend');
  }, false);
})();
