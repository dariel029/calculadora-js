
var display = document.getElementById('display');
var historyList = document.getElementById('history-list');
var operacionActual = '';


window.onload = function() {
    cargarHistorial();
};

function agregarNumero(num) {
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else {
        display.value += num;
    }
}

function agregarOperacion(op) {
    display.value += ' ' + op + ' ';
}

function limpiar() {
    display.value = '0';
}

function borrarUno() {
    if (display.value.length > 1) {
        display.value = display.value.trim().slice(0, -1).trim();
        if (display.value === '') {
            display.value = '0';
        }
    } else {
        display.value = '0';
    }
}

function calcular() {
    try {
        var expresion = display.value;
        var resultado = eval(expresion);
        
        
        if (resultado % 1 !== 0) {
            resultado = resultado.toFixed(2);
        }

        var registro = expresion + ' = ' + resultado;
        display.value = resultado;

        // Guardar operacion en el historial
        guardarEnHistorial(registro);
    } catch (e) {
        display.value = 'Error';
        setTimeout(limpiar, 1500);
    }
}

function guardarEnHistorial(registro) {
    var historial = obtenerHistorial();
    historial.unshift(registro); 
    localStorage.setItem('historialCalculadora', JSON.stringify(historial));
    renderizarHistorial();
}

function obtenerHistorial() {
    var historialGuardado = localStorage.getItem('historialCalculadora');
    return historialGuardado ? JSON.parse(historialGuardado) : [];
}

function cargarHistorial() {
    renderizarHistorial();
}

function renderizarHistorial() {
    var historial = obtenerHistorial();
    historyList.innerHTML = '';

    if (historial.length === 0) {
        historyList.innerHTML = '<li>No hay historial grabado</li>';
        return;
    }

    for (var i = 0; i < historial.length; i++) {
        var li = document.createElement('li');
        li.textContent = historial[i];
        historyList.appendChild(li);
    }
}

function limpiarHistorial() {
    localStorage.removeItem('historialCalculadora');
    renderizarHistorial();
}