const formulario = document.getElementById("responsavelForm");
const mensagem = document.getElementById("mensagem");
const listaResponsaveis = document.getElementById("listaResponsaveis");
const selectFalecido = document.getElementById("falecido");

function carregarFalecidos() {
    const falecidos = JSON.parse(localStorage.getItem("falecidos")) || [];

    if (falecidos.length === 0) {

        selectFalecido.innerHTML = `
            <option value="">
                Nenhum falecido cadastrado
            </option>
        `;

        return;
    }

    selectFalecido.innerHTML = `
        <option value="">
            Selecione o falecido
        </option>
    `;

    falecidos.forEach(function(falecido) {

        const opcao = document.createElement("option");

        opcao.value = falecido.id;

        opcao.textContent = falecido.nome;

        selectFalecido.appendChild(opcao);

    });

}

formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const idFalecido = Number(selectFalecido.value);
        const falecidos = JSON.parse(localStorage.getItem("falecidos")) || [];
        const falecidoEncontrado = falecidos.find(function(falecido) {
                return falecido.id === idFalecido;
            });

        if (!falecidoEncontrado) {

            mensagem.textContent = "Selecione um falecido.";
            mensagem.className = "erro";

            return;
        }

        const responsavel = {

            id: Date.now(),

            nome:
                document.getElementById("nome").value,

            cpf:
                document.getElementById("cpf").value,

            telefone:
                document.getElementById("telefone").value,

            email:
                document.getElementById("email").value,

            parentesco:
                document.getElementById("parentesco").value,

            falecidoId:
                falecidoEncontrado.id,

            falecidoNome:
                falecidoEncontrado.nome

        };

        let responsaveis = JSON.parse(localStorage.getItem("responsaveis")) || [];

        responsaveis.push(responsavel);

        localStorage.setItem(
            "responsaveis",
            JSON.stringify(responsaveis)
        );

        mensagem.textContent = "Responsável cadastrado com sucesso!";
        mensagem.className = "sucesso";

        formulario.reset();
        mostrarResponsaveis();

    }
);

function mostrarResponsaveis() {
    const responsaveis = JSON.parse(
            localStorage.getItem("responsaveis")
        ) || [];

    listaResponsaveis.innerHTML = "";

    if (responsaveis.length === 0) {

        listaResponsaveis.innerHTML = `
            <p>
                Nenhum responsável cadastrado.
            </p>
        `;

        return;
    }

    responsaveis.forEach(
        function(responsavel) {
            const card = document.createElement("div");

            card.className = "card-responsavel";


            card.innerHTML = `

                <h3>
                    ${responsavel.nome}
                </h3>

                <p>
                    <strong>CPF:</strong>
                    ${responsavel.cpf}
                </p>

                <p>
                    <strong>Telefone:</strong>
                    ${responsavel.telefone}
                </p>

                <p>
                    <strong>E-mail:</strong>
                    ${responsavel.email}
                </p>

                <p>
                    <strong>Parentesco:</strong>
                    ${responsavel.parentesco}
                </p>

                <p>
                    <strong>Falecido:</strong>
                    ${responsavel.falecidoNome}
                </p>

                <button
                    class="botao-excluir"
                    onclick="excluirResponsavel(${responsavel.id})"
                >
                    Excluir
                </button>

            `;


            listaResponsaveis.appendChild(card);

        }
    );

}

function excluirResponsavel(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este responsável?");

    if (!confirmar) {
        return;
    }

    let responsaveis = JSON.parse(localStorage.getItem("responsaveis")) || [];

    responsaveis =
        responsaveis.filter(
            function(responsavel) {
                return responsavel.id !== id;
            }
        );

    localStorage.setItem(
        "responsaveis",
        JSON.stringify(responsaveis)
    );

    mostrarResponsaveis();

}

carregarFalecidos();
mostrarResponsaveis();