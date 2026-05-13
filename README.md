# Projeto de Representação de Grafos em JavaScript

## 🚀 Estratégia do Algoritmo de Busca

Para encontrar um caminho entre dois vértices, foi utilizado o algoritmo de **Busca em Largura** (*Breadth-First Search* ou **BFS**). 

**Por que a Busca em Largura?**
A BFS é o algoritmo perfeito para grafos não-ponderados (grafos onde as arestas não têm um peso ou "custo" de distância). Ela garante matematicamente que o caminho encontrado será sempre o **caminho mais curto** (ou seja, o caminho com o menor número de saltos ou arestas) entre o ponto de partida e o destino.

**Como ela funciona passo a passo?**
1. **Fila de Exploração (FIFO):** O algoritmo usa uma estrutura de fila (o primeiro a entrar é o primeiro a sair) para explorar o grafo "camada por camada". Primeiro, ele olha todos os vizinhos diretos do vértice inicial. Depois, os vizinhos dos vizinhos, e assim sucessivamente.
2. **Controle de Visitados:** Para evitar que o algoritmo fique preso em um "loop infinito" (caso o grafo tenha ciclos), mantemos um registro de quais vértices já foram visitados. Se um vértice já está nesse registro, ele é ignorado.
3. **Rastro de Predecessores:** Enquanto avança, o algoritmo anota de onde ele veio. Por exemplo, se ele chegou no vértice `C` através do vértice `B`, ele anota que o "pai" de `C` é `B`. 
4. **Reconstrução do Caminho (Backtracking):** Quando o algoritmo finalmente encontra o vértice de destino, ele para a busca. Em seguida, ele usa o rastro de predecessores (de trás para frente) para montar a rota exata do início ao fim e a devolve como um Array.

---

## Funcionalidades
* Adição de Vértices e Arestas.
* Contagem de Laços.
* Verificação de Grafo Completo.
* Cálculo do Grau do Vértice.
* Algoritmo de Busca de Caminho (BFS).
* Exportação para a sintaxe `DOT Notation` (compatível com Graphviz).

---

## 📚 Detalhes de Cada Método da Classe `Graph`

Explicação do que cada função da classe faz nos bastidores:

* **`addVertex(vertex)`**
    * **O que faz:** Adiciona um novo vértice ao grafo.
    * **Como:** Ele verifica se o vértice já existe na `adjacencyList` (Lista de Adjacências). Se não existir, ele cria uma chave com o nome do vértice e atribui a ela um Array vazio (que futuramente guardará os vizinhos desse vértice).

* **`addEdge(v1, v2)`**
    * **O que faz:** Cria uma aresta (conexão) entre dois vértices.
    * **Como:** Como estamos trabalhando com um **grafo não-direcionado**, a conexão é uma via de mão dupla. Ele insere `v2` na lista de vizinhos de `v1` e insere `v1` na lista de vizinhos de `v2`. Se for um laço (v1 igual a v2), ele insere apenas uma vez.

* **`countLoops()`**
    * **O que faz:** Conta quantas arestas ligam um vértice a ele mesmo.
    * **Como:** Ele percorre a lista de adjacências de cada vértice e conta quantas vezes o próprio vértice aparece na sua própria lista de vizinhos. A soma de todas essas ocorrências é o total de laços no grafo.

* **`isComplete()`**
    * **O que faz:** Verifica se o grafo é "Completo". Um grafo é completo quando **todos** os vértices possuem uma aresta direta para **todos** os outros vértices distintos.
    * **Como:** Ele usa dois loops aninhados para combinar todos os pares de vértices possíveis. Se ele encontrar pelo menos um par que não esteja conectado na lista de adjacências, ele imediatamente retorna `false`. Se ele testar tudo e não faltar nenhuma conexão, retorna `true`.

* **`getDegree(vertex)`**
    * **O que faz:** Retorna o grau de um vértice específico.
    * **Como:** O grau é o número de arestas que incidem em um vértice. A função percorre a lista de vizinhos do vértice em questão. Para cada vizinho diferente, ela soma `1` ao grau. Se o vizinho for o próprio vértice (um laço), ela soma `2`, pois em grafos não-direcionados, um laço contribui com duas pontas para o grau do vértice.

* **`findPath(start, end)`**
    * **O que faz:** Retorna um Array com a sequência de vértices do ponto inicial ao final. Se não houver caminho (ou seja, se os vértices estiverem em componentes isolados do grafo), retorna `null`.
    * **Como:** Executa a lógica de Busca em Largura (BFS) detalhada na seção anterior.

* **`toDot()`**
    * **O que faz:** Transforma a estrutura do grafo em uma string formatada na linguagem textual **DOT Notation**.
    * **Como:** Ele percorre a lista de adjacências criando linhas no formato `"A" -- "B";`. Para evitar duplicatas (já que "A -- B" é o mesmo que "B -- A"), ele cria um identificador único ordenado em ordem alfabética para cada aresta e usa um `Set` (conjunto) para garantir que cada conexão seja escrita apenas uma vez no formato final.

---

## Pré-requisitos
* Node.js instalado (v14+ recomendado).

## Como executar o projeto

1. Faça o download ou clone a pasta do projeto.
2. Navegue até o diretório via terminal.
3. Instale as dependências executando:

   ```bash
   npm install
   ```

## Executando os Testes
Para rodar a suíte de testes unitários e verificar se todos os métodos estão operando conforme o esperado, utilize:
```bash
npm test