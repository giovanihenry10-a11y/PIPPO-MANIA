document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productCards = document.querySelectorAll(".product-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();


            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");


            const selectedYear = button.getAttribute("data-year");


            productCards.forEach(card => {
                const cardYear = card.getAttribute("data-year");

                if (selectedYear === "all" || cardYear === selectedYear) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-container input");
    const productCards = document.querySelectorAll(".product-card");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        productCards.forEach(card => {
            const productName = card.querySelector("span").textContent.toLowerCase();

            if (productName.includes(searchTerm)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// ==========================================================================
// LÓGICA DO CARRINHO (Adicionar itens e atualizar contador)
// ==========================================================================

// Recupera o carrinho do localStorage ou inicia vazio
let cart = JSON.parse(localStorage.getItem('pippo_cart')) || [];

// Atualiza o contador vermelho de itens no topo da página
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Trata o clique no botão "Compre já"
function addToCart(event) {
    event.stopPropagation(); // IMPEDE que o modal abra ao clicar no botão de compra

    const button = event.currentTarget; // Garante que pega o botão mesmo se clicar no texto
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    // Procura se o item já existe no carrinho
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }

    // Salva a lista atualizada no navegador
    localStorage.setItem('pippo_cart', JSON.stringify(cart));


    // Atualiza o número visualmente imediatamente
    updateCartCount();
}

// ==========================================================================
// INICIALIZAÇÃO E LISTENERS (Executa quando a página carrega)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Renderiza a quantidade inicial no contador da navbar
    updateCartCount();

    // 2. Configura os botões de adicionar ao carrinho
    const cartButtons = document.querySelectorAll('.btn-add-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // 3. Sistema de Filtros por Ano
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productCards = document.querySelectorAll(".product-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const selectedYear = button.getAttribute("data-year");

            productCards.forEach(card => {
                const cardYear = card.getAttribute("data-year");

                if (selectedYear === "all" || cardYear === selectedYear) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 4. Sistema de Barra de Pesquisa
    const searchInput = document.querySelector(".search-container input");

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.toLowerCase().trim();

            productCards.forEach(card => {
                const productName = card.querySelector("span").textContent.toLowerCase();

                if (productName.includes(searchTerm)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
});

// LÓGICA DO MODAL
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("product-modal");
    const closeModal = document.querySelector(".close-modal");
    const productCards = document.querySelectorAll(".product-card");

    // Elementos internos do modal
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");
    const modalBtn = document.getElementById("modal-add-cart");

    // Abrir modal ao clicar no Card
    productCards.forEach(card => {
        card.addEventListener("click", () => {
            const btnData = card.querySelector(".btn-add-cart");

            // Puxa as informações dos atributos do botão interno do card
            const id = btnData.getAttribute("data-id");
            const name = btnData.getAttribute("data-name");
            const price = btnData.getAttribute("data-price");
            const imgSrc = card.querySelector("img").getAttribute("src");

            // Alimenta o Modal com os dados capturados
            modalImg.setAttribute("src", imgSrc);
            modalImg.setAttribute("alt", name);
            modalTitle.textContent = name;
            modalPrice.textContent = `R$ ${parseFloat(price).toFixed(2).replace('.', ',')}`;

            // Configura os atributos do botão interno do modal para funcionar com a função addToCart
            modalBtn.setAttribute("data-id", id);
            modalBtn.setAttribute("data-name", name);
            modalBtn.setAttribute("data-price", price);

            // Exibe o modal mudando o display para flex
            modal.style.display = "flex";
        });
    });

    // Fechar modal no botão (X)
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fechar modal ao clicar fora da caixa branca
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Atribui o clique de compra também para o botão do Modal
    modalBtn.addEventListener("click", addToCart);
});