communication.register("bezliku");


var obiekt = {
    'element' : 'div',
    'css' : {
            'height' : '200px',
            'width' : '200px',
            'background-color' : 'green',
            'color' : 'white',
            'fontSize' : '20px',
            'line-height' : '200px',
            'text-align' : 'center',
            'transition': '1s'
    },
    'css2' : {
            'height' : '300px',
            'width' : '300px',
            'background-color' : 'blue',
            'color' : 'white',
            'fontSize' : '35px',
            'line-height' : '300px',
            'text-align' : 'center',
            'transition': '1s'
    },
    'innerText' : 'Najedź mnie!'
};


communication.addMessageListener(function(kto,co) {

        var nowyElement = document.createElement(co.element);
        for (var klucz in co.css) {
             nowyElement.style[klucz] = co.css[klucz];
        };
        nowyElement.innerText = co.innerText;
        document.body.appendChild(nowyElement);

        nowyElement.addEventListener("click", function() {alert(kto)});
        
        nowyElement.addEventListener("mouseover", function(){
            for (var klucz in co.css2) {
             nowyElement.style[klucz] = co.css2[klucz];
        };
        });
        nowyElement.addEventListener("mouseout", function(){
            for (var klucz in co.css) {
             nowyElement.style[klucz] = co.css[klucz];
        };
        });
});

communication.sendTo("bezliku", obiekt);


