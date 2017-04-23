var states = [
    ['client', 'Show Python server code'],
    ['server', 'Show JavaScript client code']
];

var currentState = 0;

function toggle() {
    $('.' + states[currentState][0]).hide();
    currentState ^= 1;
    update();
}

function update() {
    $('.toggle-button').each(function (index, element) {
        $(element).text(states[currentState][1]);
    });
    
    $('.' + states[currentState][0]).show();
}

$(document).ready(function () {
    update();
});
    
