document.getElementById('form-agenda').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var nome = document.getElementById('nome-contato').value.trim();
    var telefone = document.getElementById('numero-contato').value.trim();

    // Validação para evitar campos vazios ou duplicados
    if (nome === "" || telefone === "") {
        document.getElementById('mensagem').innerText = "Nome e telefone não podem estar vazios.";
        document.getElementById('mensagem').style.color = "red";
        return;
    }

    var tabela = document.getElementById('contactList');
    var linhas = tabela.getElementsByTagName('tr');

    for (var i = 0; i < linhas.length; i++) {
        var celulas = linhas[i].getElementsByTagName('td');
        var nomeExistente = celulas[0].textContent;
        var telefoneExistente = celulas[1].textContent;

        if (nome === nomeExistente && telefone === telefoneExistente) {
            document.getElementById('mensagem').innerText = "Este contato já foi adicionado.";
            document.getElementById('mensagem').style.color = "red";
            return;
        }
    }

    // Adiciona nova linha à tabela
    var row = tabela.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.textContent = nome;
    cell2.textContent = telefone;

    document.getElementById('mensagem').innerText = "Contato adicionado com sucesso.";
    document.getElementById('mensagem').style.color = "green";

    // Limpa o formulário
    document.getElementById('form-agenda').reset();
});
