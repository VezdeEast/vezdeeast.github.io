(function() {
    var ua = detectIE(),
        contentCopy = document.getElementById("content-copy"),
        mainNav = document.querySelectorAll('.header .main-nav')[0],
        langMenu = document.querySelectorAll('.lang ul')[0];
        width = window.innerWidth;

    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        resizeReInit: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

      var mySwiper1 = new Swiper ('#team-slider, #team-slider1', {
        loop: false,
        slidesPerView: 3,
        loopAdditionalSlides: 3,
        spaceBetween: 20,
        touchMoveStopPropagation: true,
        resizeReInit: true,
        slideClass: 'team-card',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });

    if (ua === false) {
        if (width > 1269) {
            coins('.main-info', '#layer-coins');
            coins('.market .half:last-child', '#layer-coins1');

            var phoneBlock = document.getElementById('phone'),
                phoneHidden = true;
            contentCopy.style.display = 'block';
            clipPage();
            document.addEventListener('scroll', clipPage);
        }
    } else {
        contentCopy.style.display = 'none';
    }

    if (width <= 850) {
        document.getElementById('mob-menu').addEventListener('click', function(e) {
            e.preventDefault();
            if (mainNav.style.display === "none" || mainNav.style.display === "") {
                mainNav.style.display = "block"
            } else if (mainNav.style.display === "block") {
                mainNav.style.display = "none"
            }
        });
        document.body.addEventListener('click', function(e) {
            var target = e.target;
            if (target !== mainNav && target !== document.getElementById('mob-menu')) {
                mainNav.style.display = "none"
            }
        });

    }

    document.getElementById('lang-toggle').addEventListener('click', function(e) {
        e.preventDefault();
        if (langMenu.style.display === "none" || langMenu.style.display === "") {
            langMenu.style.display = "block"
        } else if (langMenu.style.display === "block") {
            langMenu.style.display = "none"
        }
    });

    document.body.addEventListener('click', function(e) {
        var target = e.target;
        if (target !== langMenu && target !== document.getElementById('lang-toggle')) {
            langMenu.style.display = "none"
        }
    });

    initAccordion(document.getElementById("accordion1"));
    initAccordion(document.getElementById("accordion2"));

    initModals();
    initTeamInfoModal(['alexey', 'crichton', 'dmitry', 'vasily', 'yamaguchi']);

    function initTeamInfoModal(slugs) {
        slugs.forEach(function(slug) {
          document.getElementById('btn-' + slug).addEventListener('click', function(e) {
            e.preventDefault();
            showModal('#modal-'+ slug);
          });
      })
    }

    if (document.getElementById('sub')) {
        document.getElementById('sub').addEventListener('click', function(e) {
            e.preventDefault();
            showModal('#modal-subscribe');
        });
    }
    document.getElementById('info-microsoft').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('#modal-microsoft');
    });
    document.getElementById('info-intel').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('#modal-intel');
    });
      document.getElementById('info-pirates').addEventListener('click', function(e) {
        e.preventDefault();
        showModal('#modal-pirates');
      });
  document.getElementById('info-chaos').addEventListener('click', function(e) {
    e.preventDefault();
    showModal('#modal-chaos');
  });
  document.getElementById('info-dcs').addEventListener('click', function(e) {
    e.preventDefault();
    showModal('#modal-dcs');
  });


    function clipPage() {
        var phoneCoord = getCoords(document.getElementById("phoneScreen")),
            clipPathStr = 'polygon(' + phoneCoord.left + 'px ' + phoneCoord.top + 'px, ' + phoneCoord.right + 'px ' + phoneCoord.top + 'px, ' + phoneCoord.right + 'px ' + phoneCoord.bottom + 'px, ' + phoneCoord.left + 'px ' + phoneCoord.bottom + 'px)';

        if (window.scrollY === 0 && phoneHidden) {
            var dy1 = window.innerHeight - 230,
                dy2 = window.innerHeight - 100,
                dx1 = phoneCoord.left,
                dx2 = phoneCoord.right;
            clipPathStr = 'polygon(' + dx1 + 'px ' + dy1 + 'px, ' + dx2 + 'px ' + dy1 + 'px, ' + dx2 + 'px ' + dy2 + 'px, ' + dx1 + 'px ' + dy2 + 'px)'
        }

        if (window.scrollY + window.innerHeight <= document.body.clientHeight - 200 && phoneHidden) {
            if (phoneHidden) {
                phoneBlock.classList.add('pin');
                phoneBlock.classList.remove('unpin');
                phoneHidden = false;
            }
        }
        if (window.scrollY + window.innerHeight > document.body.clientHeight - 200 && !phoneHidden) {
            if (!phoneHidden) {
                phoneBlock.classList.remove('pin');
                phoneBlock.classList.add('unpin');
                phoneHidden = true;
            }
        }

        contentCopy.style.clipPath = "";
        contentCopy.style.clipPath = clipPathStr;

    }
    function coins(contSel, sel) {
        var element = document.querySelector(contSel);
        var canvas = document.querySelector(sel),
            ctx = canvas.getContext('2d'),
            focused = false;

        canvas.width = element.clientWidth + 100;
        canvas.height = element.clientHeight + 100;

        var coin = new Image();
        coin.src = 'images/small_coins.png';
        coin.onload = function () {
            focused = true;
            drawloop();
        };
        var coins = [];

        function drawloop() {
            if (focused) {
                requestAnimationFrame(drawloop);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (Math.random() < .4) {
                coins.push({
                    x: Math.random() * canvas.width | 0,
                    y: -20,
                    dy: 1,
                    s: 0.5 + Math.random(),
                    state: Math.random() * 8 | 0
                })
            }
            var i = coins.length;
            while (i--) {
                var x = coins[i].x;
                var y = coins[i].y;
                var s = coins[i].s;
                var state = coins[i].state;
                coins[i].state = (state > 7) ? 0 : state + 0.15;
                coins[i].dy += 0.01;
                coins[i].y += coins[i].dy;

                ctx.drawImage(coin, 0, 22 * Math.floor(state), 22, 20, x, y, 22 * s, 20 * s);

                if (y > canvas.height) {
                    coins.splice(i, 1);
                }
            }
        }

    }

    function initAccordion(accordionElem) {
        var allPanelElems = accordionElem.querySelectorAll(".panel");
        for (var i = 0, len = allPanelElems.length; i < len; i++) {
            allPanelElems[i].addEventListener("click", handlePanelClick);
        }
        showPanel(allPanelElems[0]);


        function handlePanelClick(event) {
            var i = (getChildNumber(event.currentTarget) + 1) / 2 - 1;
            showPanel(event.currentTarget);
            document.querySelectorAll("#accordion2 .panel")[i].click();
        }

        function showPanel(panel) {
            var expandedPanel = accordionElem.querySelector(".active");
            if (expandedPanel) {
                expandedPanel.classList.remove("active");
            }
            panel.classList.add("active");
        }
    }

    function getCoords(elem) {
        var rect = elem.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            bottom: rect.top + window.scrollY + elem.clientHeight,
            right: rect.left + window.scrollX + elem.clientWidth
        };
    }

    function getChildNumber(node) {
        return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
    }

    function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        if (ua.indexOf('Windows NT 6.1') > -1 || ua.indexOf('Windows NT 6.2') > -1) {
            return true;
        }

        return false;
    }

})();

function showModal(modalSel) {
    var modals = document.querySelectorAll(modalSel), len = modals.length;
    document.documentElement.classList.add('html-modal-opened');
    document.body.classList.add('body-modal-opened');
    for (var i=0; i<len; i++) {
        modals[i].style.display = 'block';
        fadeIn(modals[i]);
    }
    return false;
}
function closeModal(modalSel) {
    var modals = document.querySelectorAll(modalSel), len = modals.length;
    for (var i=0; i<len; i++) {
        fadeOut(modals[i]);
        modals[i].style.display = 'none';
    }
    document.documentElement.classList.remove('html-modal-opened');
    document.body.classList.remove('body-modal-opened');
}
function initModals() {
    var divs = document.querySelectorAll('.modal, .close'), len = divs.length;
    var divs1 = document.querySelectorAll('.modal-window'), len1 = divs1.length;

    for (var i=0; i<len; i++) {
        divs[i].addEventListener('click', function() {
            closeModal('.modal');
            return false;
        });
    }
    for (var j=0; j<len1; j++) {
        divs1[j].addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}
function fadeIn(el) {
    el.style.opacity = 0;
    var tick = function() {
        el.style.opacity = +el.style.opacity + 0.1;
        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
        }
    };
    tick();
}

function fadeOut(el) {
    el.style.opacity = 1;
    var tick = function() {
        el.style.opacity = +el.style.opacity - 0.1;
        if (+el.style.opacity === 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
        }
    };
    tick();
}
