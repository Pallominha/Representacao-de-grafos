const Graph = require('../src/Graph');

describe('Testes de Representação do Grafo', () => {
    let graph;

    beforeEach(() => {
        graph = new Graph();
    });

    test('Deve adicionar vértices corretamente', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        expect(graph.adjacencyList['A']).toEqual([]);
        expect(graph.adjacencyList['B']).toEqual([]);
    });

    test('Deve adicionar arestas corretamente', () => {
        graph.addEdge('A', 'B');
        expect(graph.adjacencyList['A']).toContain('B');
        expect(graph.adjacencyList['B']).toContain('A');
    });

    test('Deve contar laços corretamente', () => {
        graph.addEdge('A', 'A'); // Laço no A
        graph.addEdge('A', 'B');
        graph.addEdge('C', 'C'); // Laço no C
        expect(graph.countLoops()).toBe(2);
    });

    test('Deve indicar o grau de um vértice específico', () => {
        graph.addEdge('1', '2');
        graph.addEdge('1', '3');
        graph.addEdge('1', '1'); // Laço
        expect(graph.getDegree('1')).toBe(4);
        expect(graph.getDegree('2')).toBe(1);
    });

    test('Deve verificar se o grafo é completo', () => {
        // Criando grafo completo com 3 vértices
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('B', 'C');
        expect(graph.isComplete()).toBe(true);

        // Adicionando um vértice isolado quebrando a propriedade de completo
        graph.addVertex('D');
        expect(graph.isComplete()).toBe(false);
    });

    test('Deve mostrar um caminho de um vértice até outro', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'C');
        graph.addEdge('C', 'D');
        graph.addEdge('A', 'E');

        const path = graph.findPath('A', 'D');
        expect(path).toEqual(['A', 'B', 'C', 'D']);

        // Testar caminho inexistente
        graph.addVertex('X');
        expect(graph.findPath('A', 'X')).toBeNull();
    });

    test('Deve retornar o grafo no formato DOT Notation', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'A'); // Laço
        graph.addVertex('C');    // Vértice isolado

        const dotString = graph.toDot();
        expect(dotString).toContain('graph G {');
        expect(dotString).toContain('"A" -- "B";');
        expect(dotString).toContain('"A" -- "A";');
        expect(dotString).toContain('"C";');
        expect(dotString).toContain('}');
    });
});