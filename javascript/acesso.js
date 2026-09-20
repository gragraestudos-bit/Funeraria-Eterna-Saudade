const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado")
);

if (!usuarioLogado) {
    window.location.href = "login.html";
}

const nomeUsuario = document.getElementById("usuarioLogado");

nomeUsuario.textContent =
    `Olá, ${usuarioLogado.nome}! Cargo: ${usuarioLogado.cargo}`;


const administrador = document.getElementById("administrador");
const funcionario = document.getElementById("funcionario");
const atendente = document.getElementById("atendente");


administrador.style.display = "none";
funcionario.style.display = "none";
atendente.style.display = "none";


if (usuarioLogado.cargo === "Administrador de Marketing") {
    administrador.style.display = "block";
} else if (usuarioLogado.cargo === "Gerente") {
    funcionario.style.display = "block";
} else if (usuarioLogado.cargo === "Aprendiz") {
    atendente.style.display = "block";
}