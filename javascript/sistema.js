const usuarioLogado =
    JSON.parse(localStorage.getItem("usuarioLogado"));
if (!usuarioLogado) {

    window.location.href = "login.html";

}

const saudacao = document.getElementById("saudacao");
const cargo = document.getElementById("cargo");
const botaoSair = document.getElementById("botaoSair");
const cardFalecidos = document.getElementById("cardFalecidos");
const cardResponsaveis = document.getElementById("cardResponsaveis");
const cardServicos = document.getElementById("cardServicos");
const cardAdministracao = document.getElementById("cardAdministracao");

saudacao.textContent = `Olá, ${usuarioLogado.nome}!`;
cargo.textContent = `Cargo: ${usuarioLogado.cargo}`;

cardFalecidos.style.display = "none";
cardResponsaveis.style.display = "none";
cardServicos.style.display = "none";
cardAdministracao.style.display = "none";

if ( usuarioLogado.cargo === "Administrador de Marketing") {
    cardFalecidos.style.display = "flex";
    cardResponsaveis.style.display = "flex";
    cardServicos.style.display = "flex";
    cardAdministracao.style.display = "flex";
} else if (usuarioLogado.cargo ==="Gerente") {
    cardFalecidos.style.display = "flex";
    cardResponsaveis.style.display = "flex";
    cardServicos.style.display = "flex";
} else if (usuarioLogado.cargo === "Aprendiz") {
    cardFalecidos.style.display = "flex";
    cardResponsaveis.style.display = "flex";
}

botaoSair.addEventListener(
    "click",
    function() {
        localStorage.removeItem(
            "usuarioLogado"
        );

        window.location.href = "login.html";

    }
);