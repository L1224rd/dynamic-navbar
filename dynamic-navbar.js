$('document').ready(() => {
  //Elemento que vai receber os eventos.
  let nav = $('.navbar');

  //Ao rolar a página, a função será executada.
  const divs = ['banner_id', 'legal_id', 'methodology_id', 'other_id', 'profile_id', 'drops_id', 'contact_id'];
  const setHeight = 100;

  let offSets;

  (() => { // auto invoked function
    offSets = divs.map((div) => {
      const offSet = $(`#${div}`).offset();
      if (offSet) return offSet.top;
    });
  })();

  const updateMenuColor = (div) => {
    $(`a[href=#${divs[div]}]`).attr('id', 'mustard');
    $('.menu').find('li').find('a').not(`a[href=#${divs[div]}]`).removeAttr('id');
  }

  const setNavColor = (div) => {
    updateMenuColor(div);
    if (div === 4 || div === 6) setNavWhite();
    else setNavBlack();

    if (div === 0) {
      $('#navbar_id').find("img").attr('src', '../../static/img/logo_inteira.png');
    } else {
      $('#navbar_id').find("img").attr('src', '../../static/img/logo_encurtada.png');
    }

    if ($('html, body').scrollTop() === 0) {
      nav.removeClass("white_navbar");
      nav.removeClass("black_navbar");
      $('#navbar_id').find("img").attr('src', '../../static/img/logo_inteira.png');
    }
  }

  const setNavBlack = () => {
    nav.addClass("black_navbar");
    nav.removeClass("white_navbar");
    $('#hamburger_icon').find("img").attr('src', '../../static/img/hamburger_branco.png');
  }

  const setNavWhite = () => {
    // TODO: resolver glitch da logo
    nav.removeClass("black_navbar");
    nav.addClass("white_navbar");
    $('#hamburger_icon').find("img").attr('src', '../../static/img/hamburger_preto.png');
  }

  const checkOffSet = (scrollHeight) => {
    let newOffSets = offSets.slice(0);
    newOffSets.push(scrollHeight);
    newOffSets.sort((a, b) => a - b);
    setNavColor(newOffSets.indexOf(scrollHeight));
  }

  $(window).scroll(() => {
    checkOffSet($('html, body').scrollTop() + setHeight);
  });

  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      event.preventDefault();
      $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 1000);
    });

});