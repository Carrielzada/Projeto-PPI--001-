(function ($) {
    'use strict';
    try {
        var selectSimple = $('.js-select-simple');
        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });

    } catch (err) {
        console.log(err);
    }

})(jQuery);

// Aqui começam as validações
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

function codigo(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 2) {
        valor = valor.substring(0, 2);
    }
    valor = '+' + valor;
    return valor;
}

function telefone(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    valor = valor.replace(/(-\d{4})\d+?$/, '$1');
    return valor;
}

function cpf(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{3})/, '$1-$2');
    valor = valor.replace(/(-\d{2})\d+?$/, '$1');
    return valor;
}

function rg(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 10) { // Limite de 10 dígitos
        valor = valor.substring(0, 10);
    }
    valor = valor.replace(/^(\d{2})(\d{3})(\d{3})(\d)(\d{1})?$/, "$1.$2.$3-$4$5");
    return valor;
}

const campos = document.querySelectorAll('input');

campos.forEach(campo => {
    campo.addEventListener('input', function () {
        if (this.name === 'telefone') {
            this.value = telefone(this.value);
        } else if (this.name === 'code') {
            this.value = codigo(this.value);
        } else if (this.name === 'cpf') {
            this.value = cpf(this.value);
        } else if (this.name === 'rg') {
            this.value = rg(this.value);
        } else if (this.name === 'email') {
            this.value = this.value.trim(); // Remove espaços no início e no fim
        }
    });

    campo.addEventListener('blur', function () {
        if (this.name === 'telefone' && this.value.length < 14) {
            alert('Número de telefone inválido!');
        } else if (this.name === 'cpf' && this.value.length < 14) {
            alert('CPF inválido!');
        }
    });
});
