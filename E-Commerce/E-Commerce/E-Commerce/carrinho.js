// Função principal que renderiza os itens salvos no localStorage
function renderCart() {
    // Busca os produtos salvos ou cria um array vazio se não houver nenhum
    const cart = JSON.parse(localStorage.getItem('pippo_cart')) || [];
    
    const container = document.getElementById('cart-items-list');
    const totalElement = document.getElementById('cart-total-price');
    
    // Verifica se os elementos existem na página antes de continuar
    if (!container || !totalElement) return;

    container.innerHTML = '';
    let total = 0;

    // Se o carrinho estiver vazio, mostra uma mensagem
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">Seu carrinho está vazio.</p>';
        totalElement.textContent = '0,00';
        return;
    }

    // Roda um loop para criar o HTML de cada item que está no carrinho
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        container.innerHTML += `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
                <div>
                    <strong style="color: #333;">${item.name}</strong> <br>
                    <span style="color: #666;">${item.quantity}x R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <div style="font-weight: bold; color: #333;">
                    R$ ${itemTotal.toFixed(2).replace('.', ',')}
                </div>
            </div>
        `;
    });

    // Atualiza o preço total formatado para a moeda local
    totalElement.textContent = total.toFixed(2).replace('.', ',');
}

// Função para esvaziar o carrinho por completo
function clearCart() {
    if (confirm("Tem certeza que deseja esvaziar o carrinho?")) {
        localStorage.removeItem('pippo_cart');
        renderCart(); // Recarrega a tela vazia
    }
}

// Executa a função automaticamente assim que a página carrinho.html carregar
document.addEventListener('DOMContentLoaded', renderCart);

// Função para enviar o pedido para o WhatsApp da loja
// Função para confirmar a compra apenas exibindo um alerta na tela
function checkoutCart() {
    const cart = JSON.parse(localStorage.getItem('pippo_cart')) || [];
    
    if (cart.length === 0) {
        alert("Seu carrinho está vazio! Adicione produtos antes de confirmar.");
        return;
    }

    // Monta o texto do resumo que aparecerá no alerta
    let resumoPedido = "Pedido Confirmado com Sucesso!\n\nResumo da sua compra:\n";
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        resumoPedido += `- ${item.quantity}x ${item.name}: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    });

    resumoPedido += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}\n\nObrigado por comprar na Pippo Mania!`;

    // Exibe o alerta com o resumo na tela
    alert(resumoPedido);

    // Opcional: Limpa o carrinho do navegador após o usuário clicar em "OK" no alerta
    localStorage.removeItem('pippo_cart');
    renderCart(); // Atualiza a tela para mostrar que o carrinho agora está vazio
}