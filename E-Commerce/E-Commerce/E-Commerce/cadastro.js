document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCadastro");

    form.addEventListener("submit", (e) => {
    
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        localStorage.setItem("usuarioCadastrado", JSON.stringify(usuario));

        alert(`Cadastro realizado com sucesso! Bem-vindo ao Pippo Mania, ${nome}!`);

        window.location.href = "e.html";
    });
});