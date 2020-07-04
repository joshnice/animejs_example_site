let translate_x, direction;

window.onload = async function() {

    console.log('loading is complete');
    const window_height = window.innerHeight;
    const menu_text_1 = insertingMenuElements('menu-text-1');
    const menu_text_2 = insertingMenuElements('menu-text-2');

    for (let i = 0; i < menu_text_1.length; i++) {
        $('#' + menu_text_1[i]).hide();
        $('#' + menu_text_2[i]).hide();

    }

    // side bar animation 1
    const side_bar_menu_animations = anime({
        targets: '#side-menu-example-1',
        borderRadius: ['50%', '0%'],
        easing: 'easeInOutQuad',
        width: '300px',
        height: ['100px', window_height / 4],
        duration: 3000,
        autoplay: false,
        complete: function() {
            translate_x = 100;
            animateMenuText(menu_text_1);
        }
    });

    $( "#side-menu-example-1" ).on( "click", async  function() {
        await side_bar_menu_animations.play();
    });


    // side bar animation 2
    const side_bar_menu_animations_2 = anime({
        targets: '#side-menu-example-2',
        rotate: [-180, 0],
        width: '300px',
        height: ['100px', window_height / 4],
        duration: 4000,
        easing: 'easeInOutExpo',
        autoplay: false, 
        complete: function() {
            translate_x = 20;
            direction = true;
            animateMenuText(menu_text_2);
            direction = false;
        }
    });

    $("#side-menu-example-2").on( "click", async  function() {
        await side_bar_menu_animations_2.play();
    });
};

function insertingMenuElements(name) {
    const menu_text_elements = document.getElementsByClassName(name);
    const menu_text_ids = [];

    for (let i = 0; i < menu_text_elements.length; i++) {
        menu_text_ids.push(menu_text_elements[i].id);
    }

    return menu_text_ids;
}

function animateMenuText(menu_text, index = 0) {

    let animation_direction = 'normal'
    let translate_actual_x = translate_x;

    if (menu_text[index] == null) {
        return;
    }

    $('#' + menu_text[index]).show();

    console.log('animation direction', animation_direction);

    const side_bar_text_animaition = anime({    
        targets: '#' + menu_text[index],
        translateX: translate_actual_x,
        delay: anime.stagger(100),
        direction: animation_direction,
        complete: function() {
            index++;
            animateMenuText(menu_text, index);
        }
    });

    side_bar_text_animaition.play();
}
