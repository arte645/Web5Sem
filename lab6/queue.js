class Node {
    constructor(value, parent = null, child = null) {
        this.value = value;  // Сохраняем значение узла
        this.parent = parent;
        this.child = child;
    }
}

class Queue {
    constructor() {
        this.root = null; // Начинаем с пустой очереди
    }
    
    getLastChild() {
        let node = this.root;
        if (!node) return null; // Если очередь пуста, вернуть null
        
        while (node.child !== null) {
            node = node.child;
        }
        return node;
    }

    Take() {
        const takenNode = this.root;
        if(this.root.child){
            this.root = this.root.child;
            this.root.parent = null;
        }
        else{
            this.root = null;
        }
        return takenNode;
    }

    put(node) {
        if (!(node instanceof Node)) {
            throw new Error('Argument must be an instance of Node');
        }
        
        if (!this.root) {
            this.root = node; // Если очередь пуста, устанавливаем корень
        } else {
            const parentNode = this.getLastChild();
            parentNode.child = node; // Устанавливаем следующий узел
            node.parent = parentNode; // Устанавливаем родителя для нового узла
        }
    }
}

const queue = new Queue();

document.getElementById('addNode').addEventListener('click', () => {
    const nodeValueInput = document.getElementById('nodeValue');
    const value = Number(nodeValueInput.value);
    
    const newNode = new Node(value); // Создаём новый узел с введённым значением
    queue.put(newNode);
    displayQueue();
    nodeValueInput.value = ''; // Очистка поля ввода
});

document.getElementById('takeNode').addEventListener('click', () => {
    displayTakenNode();
    const takenNode = queue.Take();
    // Устанавливаем задержку перед обновлением
    setTimeout(() => {
        displayQueue(takenNode);
    }, 200);
});

function displayQueue(takenNode = null) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Очищаем вывод перед добавлением новых квадратов

    let node = queue.root;

    while (node) {
        const nodeDiv = document.createElement('div'); // Создаем новый div для узла
        nodeDiv.className = 'node';                  // Применяем класс для стилей
        nodeDiv.textContent = node.value;            // Устанавливаем текстовое содержимое
        outputDiv.appendChild(nodeDiv);               // Добавляем квадрат в вывод
        node = node.child;                            // Переход к следующему узлу
    }

    if (takenNode) {
        const takenMessage = document.createElement('div');
        takenMessage.textContent = 'Взятый узел: ' + takenNode.value;
        outputDiv.appendChild(takenMessage);
    }

    if (!queue.root) {
        const emptyMessage = document.createElement('div');
        emptyMessage.textContent = 'Очередь пуста.';
        outputDiv.appendChild(emptyMessage);
    }
}

function displayTakenNode() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Очищаем вывод перед добавлением новых квадратов

    let node = queue.root;
    
    while (node) {
        const nodeDiv = document.createElement('div');
        if(node == queue.root){
            nodeDiv.className = 'takenNode';
        }
        else{
            nodeDiv.className = 'node';
        }                  
        nodeDiv.textContent = node.value;           
        outputDiv.appendChild(nodeDiv);               
        node = node.child;                            
    }
}