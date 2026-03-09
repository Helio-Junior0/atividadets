// --- PARTE 2: REFATORAÇÃO ---

// 1. Interfaces (As "regras" que todos devem seguir)
interface CalculoImposto {
    calcular(preco: number, quantidade: number): number;
}

interface MetodoPagamento {
    processar(valor: number): void;
}

// 2. Classes Especialistas em Impostos (SRP)
class ImpostoEletronico implements CalculoImposto {
    calcular(p: number, q: number) { return (p * q) * 1.15; }
}

class ImpostoAlimento implements CalculoImposto {
    calcular(p: number, q: number) { return (p * q) * 1.05; }
}

// 3. Classes Especialistas em Pagamento (SRP)
class PagamentoPix implements MetodoPagamento {
    processar(v: number) { console.log(`Pago via PIX: R$ ${v}`); }
}

class PagamentoBoleto implements MetodoPagamento {
    processar(v: number) { console.log(`Boleto gerado: R$ ${v}`); }
}

// 4. O Serviço Principal (Apenas coordena)
class PedidoService {
    constructor(
        private imposto: CalculoImposto, 
        private pagamento: MetodoPagamento
    ) {}

    finalizar(preco: number, quantidade: number) {
        const total = this.imposto.calcular(preco, quantidade);
        this.pagamento.processar(total);
        console.log("Notificação: Pedido finalizado!");
    }
}

// --- PARTE 3: EXTENSÃO (O código cresce sem mexer no que está acima) ---

// Novo produto: LIVRO
class ImpostoLivro implements CalculoImposto {
    calcular(p: number, q: number) { return p * q; } // 0% imposto
}

// Novo pagamento: CRIPTOMOEDA
class PagamentoCripto implements MetodoPagamento {
    processar(v: number) { console.log(`Pago com Criptomoeda: R$ ${v}`); }
}

// TESTE DO SISTEMA
const meuPedido = new PedidoService(new ImpostoLivro(), new PagamentoCripto());
meuPedido.finalizar(100, 2); // Deve imprimir o valor sem imposto pago em Cripto