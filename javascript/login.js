const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const usuarioDigitado =
        document.getElementById("usuario").value;

    const senhaDigitada =
        document.getElementById("senha").value;

    const mensagem =
        document.getElementById("mensagem");


    try {

        const resposta =
            await fetch("../json/login.json");

        const dados =
            await resposta.json();


        const usuarioEncontrado =
            dados.usuarios.find(function(usuario) {

                return (
                    usuario.usuario === usuarioDigitado &&
                    usuario.senha === senhaDigitada
                );

            });


        if (usuarioEncontrado) {

            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(usuarioEncontrado)
            );


            mensagem.textContent =
                "Login realizado com sucesso!";

            mensagem.className =
                "sucesso";

            setTimeout(function() {

                window.location.href =
                    "sistema.html";

            }, 500);


        } else {
            mensagem.textContent =
                "Usuário ou senha incorretos.";

            mensagem.className =
                "erro";
        }


    } catch (erro) {

        mensagem.textContent =
            "Não foi possível acessar os dados.";

        mensagem.className =
            "erro";

        console.error(erro);

    }

});