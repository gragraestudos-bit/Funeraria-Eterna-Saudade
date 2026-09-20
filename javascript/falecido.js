const formulario =
    document.getElementById("falecidoForm");


const mensagem =
    document.getElementById("mensagem");


const listaFalecidos =
    document.getElementById("listaFalecidos");


formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    const falecido = {
        id: Date.now(),

        nome:
            document.getElementById("nome").value,

        cpf:
            document.getElementById("cpf").value,

        nascimento:
            document.getElementById("nascimento").value,

        falecimento:
            document.getElementById("falecimento").value,

        sexo:
            document.getElementById("sexo").value,

        observacoes:
            document.getElementById("observacoes").value

    };


    let falecidos =
        JSON.parse(
            localStorage.getItem("falecidos")
        ) || [];


    falecidos.push(falecido);


    localStorage.setItem(
        "falecidos",
        JSON.stringify(falecidos)
    );


    mensagem.textContent =
        "Falecido cadastrado com sucesso!";


    mensagem.className =
        "sucesso";


    formulario.reset();


    mostrarFalecidos();

});


function mostrarFalecidos() {

    const falecidos =
        JSON.parse(
            localStorage.getItem("falecidos")
        ) || [];


    listaFalecidos.innerHTML = "";


    if (falecidos.length === 0) {

        listaFalecidos.innerHTML = `
            <p>
                Nenhum falecido cadastrado.
            </p>
        `;

        return;

    }

    falecidos.forEach(function(falecido) {

        const card =
            document.createElement("div");


        card.className =
            "card-falecido";


        card.innerHTML = `

            <h3>
                ${falecido.nome}
            </h3>

            <p>
                <strong>CPF:</strong>
                ${falecido.cpf}
            </p>

            <p>
                <strong>Data de nascimento:</strong>
                ${falecido.nascimento}
            </p>

            <p>
                <strong>Data de falecimento:</strong>
                ${falecido.falecimento}
            </p>

            <p>
                <strong>Sexo:</strong>
                ${falecido.sexo}
            </p>

            <p>
                <strong>Observações:</strong>
                ${falecido.observacoes || "Nenhuma"}
            </p>

            <button
                class="botao-excluir"
                onclick="excluirFalecido(${falecido.id})"
            >
                Excluir
            </button>

        `;


        listaFalecidos.appendChild(card);

    });

}

function excluirFalecido(id) {

    const confirmar =
        confirm(
            "Tem certeza que deseja excluir este cadastro?"
        );


    if (!confirmar) {

        return;

    }


    let falecidos =
        JSON.parse(
            localStorage.getItem("falecidos")
        ) || [];


    falecidos =
        falecidos.filter(function(falecido) {

            return falecido.id !== id;

        });


    localStorage.setItem(
        "falecidos",
        JSON.stringify(falecidos)
    );


    mostrarFalecidos();

}

mostrarFalecidos();