$(document).ready(function() {
    $('form').on('submit', function(e) {
        e.preventDefault();

        // Obtém o valor da tarefa
        const tarefa = $('#nome-tarefa').val().trim();

        // Verifica se o campo não está vazio
        if (tarefa !== "") {
            // Cria um novo item de lista
            const tarefaAdicionada = $('<li></li>').text(tarefa);

            // Adiciona o item de lista à lista não ordenada
            $('ul').append(tarefaAdicionada);

            // Limpa o campo de entrada
            $('#nome-tarefa').val('');
        } else {
            alert("Por favor, insira uma tarefa.");
        }
    });

    // Usa delegação de eventos para lidar com tarefas adicionadas dinamicamente
    $('ul').on('click', 'li', function() {
        $(this).toggleClass('completed');
    });
})