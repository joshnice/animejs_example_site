window.onload = async function() {

    console.log('loading is complete');
    const window_height = window.innerHeight;
    const menu_text = insertingMenuElements();

    for (let i = 0; i < menu_text.length; i++) {
        $('#' + menu_text[i]).hide();
    }

    const side_bar_menu_animations = anime({
        targets: '#side-menu-example-1',
        borderRadius: ['50%', '0%'],
        easing: 'easeInOutQuad',
        width: '300px',
        height: ['100px', window_height / 4],
        duration: 3000,
        autoplay: false,
        complete: function() {
            animateMenuText(menu_text, 0);
        }
    });

    $( "#side-menu-example-1" ).on( "click", async  function() {
        await side_bar_menu_animations.play();
    });
};

function insertingMenuElements() {
    const menu_text_elements = document.getElementsByClassName("menu-text");
    const menu_text_ids = [];

    for (let i = 0; i < menu_text_elements.length; i++) {
        menu_text_ids.push(menu_text_elements[i].id);
    }

    return menu_text_ids;
}

function animateMenuText(menu_text, index) {

    if (menu_text[index] == null) {
        return;
    }

    $('#' + menu_text[index]).show();

    const side_bar_text_animaition = anime({    
        targets: '#' + menu_text[index],
        translateX: 100,
        delay: anime.stagger(100),
        complete: function() {
            index++;
            animateMenuText(menu_text, index);
        }
    });

    side_bar_text_animaition.play();
}
