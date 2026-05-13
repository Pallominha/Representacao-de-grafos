class Graph {
    constructor() {
        // A lista de adjacências consiste em um mapeamento (Dicionário/Objeto) de vértices para listas de vértices adjacentes.
        this.adjacencyList = {};
    }

    // Adiciona vértice
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    // Adiciona aresta
    addEdge(v1, v2) {
        this.addVertex(v1);
        this.addVertex(v2);

        this.adjacencyList[v1].push(v2);
        // Se não for um laço, adiciona na lista do outro vértice também
        if (v1 !== v2) {
            this.adjacencyList[v2].push(v1);
        }
    }

    // Conta quantos laços o grafo possui
    countLoops() {
        let loops = 0;
        for (let vertex in this.adjacencyList) {
            // Conta quantas vezes o próprio vértice aparece na sua lista de adjacência
            const vertexLoops = this.adjacencyList[vertex].filter(v => v === vertex).length;
            loops += vertexLoops;
        }
        return loops;
    }

    // Verifica se o grafo é completo
    isComplete() {
        const vertices = Object.keys(this.adjacencyList);
        const n = vertices.length;

        if (n <= 1) return true; // Um grafo trivial é tecnicamente completo.

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const v1 = vertices[i];
                const v2 = vertices[j];
                // Se faltar a ligação entre algum par de vértices distintos, não é completo
                if (!this.adjacencyList[v1].includes(v2)) {
                    return false;
                }
            }
        }
        return true;
    }

    // Indica o grau de um vértice específico
    getDegree(vertex) {
        if (!this.adjacencyList[vertex]) return 0;

        let degree = 0;
        for (let neighbor of this.adjacencyList[vertex]) {
            if (neighbor === vertex) {
                degree += 2; // Laço
            } else {
                degree += 1; // Aresta normal
            }
        }
        return degree;
    }

    // Mostra um caminho de um vértice até outro
    findPath(start, end) {
        if (!this.adjacencyList[start] || !this.adjacencyList[end]) return null;
        if (start === end) return [start];

        const queue = [start];
        const visited = { [start]: true };
        const predecessor = {};

        while (queue.length > 0) {
            const current = queue.shift();

            for (let neighbor of this.adjacencyList[current]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    predecessor[neighbor] = current;
                    queue.push(neighbor);

                    // Se encontrou o destino, reconstrói o caminho
                    if (neighbor === end) {
                        const path = [];
                        let step = end;
                        while (step) {
                            path.unshift(step); // Insere no início do array
                            step = predecessor[step];
                        }
                        return path;
                    }
                }
            }
        }
        return null; // Retorna null se não houver caminho
    }

    // Retorna o grafo no formato DOT
    toDot() {
        let dot = 'graph G {\n';
        const visitedEdges = new Set();

        for (let vertex in this.adjacencyList) {
            // Se for um vértice isolado
            if (this.adjacencyList[vertex].length === 0) {
                dot += `  "${vertex}";\n`;
            }

            for (let neighbor of this.adjacencyList[vertex]) {
                // Cria um identificador único para a aresta para evitar duplicação, exemplo: "A-B" e "B-A"
                const edgeId = [vertex, neighbor].sort().join('-');

                if (!visitedEdges.has(edgeId)) {
                    dot += `  "${vertex}" -- "${neighbor}";\n`;
                    visitedEdges.add(edgeId);
                }
            }
        }
        dot += '}';
        return dot;
    }
}

module.exports = Graph;