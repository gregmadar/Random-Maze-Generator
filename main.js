let cols = 4;
let rows = 4;
let current;

let grid = [];
let ids = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12', 'g13', 'g14', 'g15', 'g16'];
let stack = [];

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.show = function() {
        document.getElementById(ids[y * rows + x]).style.backgroundColor = 'blue';
        if (this.walls[0] === true) {
            document.getElementById(ids[this.y * rows + this.x]).style.borderTopStyle = 'solid';
            document.getElementById(ids[this.y * rows + this.x]).style.borderTopColor = 'white';
            document.getElementById(ids[this.y * rows + this.x]).style.borderTopWidth = '1px';
        }
        if (this.walls[1] === true) {
            document.getElementById(ids[this.y * rows + this.x]).style.borderRightStyle = 'solid';
            document.getElementById(ids[this.y * rows + this.x]).style.borderRightColor = 'white';
            document.getElementById(ids[this.y * rows + this.x]).style.borderRightWidth = '1px';
        }
        if (this.walls[2] === true) {
            document.getElementById(ids[this.y * rows + this.x]).style.borderBottomStyle = 'solid';
            document.getElementById(ids[this.y * rows + this.x]).style.borderBottomColor = 'white';
            document.getElementById(ids[this.y * rows + this.x]).style.borderBottomWidth = '1px';
        }
        if (this.walls[3] === true) {
            document.getElementById(ids[this.y * rows + this.x]).style.borderLeftStyle = 'solid';
            document.getElementById(ids[this.y * rows + this.x]).style.borderLeftColor = 'white';
            document.getElementById(ids[this.y * rows + this.x]).style.borderLeftWidth = '1px';
        }
        if (this.visited === true) {
            document.getElementById(ids[y * rows + x]).style.backgroundColor = 'purple';
        }
    }
    this.removeBorders = function() {
        if (this.walls[0] === false) {
            document.getElementById(ids[this.y * rows + this.x]).style.borderTop = 'none';
        }
        if (this.walls[1] === false) {
            document.getElementById(ids[this.y * rows + this.x]).style.borderRight = 'none';
        }
        if (this.walls[2] === false) {
            document.getElementById(ids[this.y * rows + this.x]).style.borderBottom = 'none';
        }
        if (this.walls[3] === false) {
            document.getElementById(ids[this.y * rows + this.x]).style.borderLeft = 'none';
        }
    }
    this.checkNeighbors = function() {
        let neighbors = [];

        let top = grid[cols * (this.y - 1) + this.x];
        let right = grid[this.y * cols + (this.x + 1)];
        let bottom = grid[cols * (this.y + 1) + this.x];
        let left = grid[this.y * cols + (this.x - 1)];

        if ((this.y - 1 >= 0) && top.visited === false) {
            neighbors.push(top);
        }
        if ((this.x + 1 <= (cols - 1)) && right.visited === false) {
            neighbors.push(right);
        }
        if ((this.y + 1 <= (rows - 1)) && bottom.visited === false) {
            neighbors.push(bottom);
        }
        if ((this.x - 1 >= 0) && left.visited === false) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            let r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        }
        else {
            return undefined;
        }
    }
}

function removeWalls(a, b) {
    let i = a.x - b.x;
    if (i === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
        a.removeBorders();
        b.removeBorders();
    }
    else if (i === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
        a.removeBorders();
        b.removeBorders();
    }
    let j = a.y - b.y;
    if (j === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
        a.removeBorders();
        b.removeBorders();
    }
    else if (j === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
        a.removeBorders();
        b.removeBorders();
    }
}

function setup() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = new Cell(j, i);
            grid.push(cell);
        }
    }
    current = grid[0];
    current.visited = true;
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
}

function draw() {
    let next = current.checkNeighbors();
    current.show();
    while (next) {
        next.visited = true;

        stack.push(current);

        next.show();
        removeWalls(current, next);

        current = next;
        next = current.checkNeighbors();

        while (next === undefined) {
            let newCell = stack.pop();
            current = newCell;
            next = current.checkNeighbors();
        }
    }
}

function refresh(event) {
    document.location.reload(true);
}

setup();

document.getElementById('generateMaze').addEventListener('click', draw);
document.getElementById('reset').addEventListener('click', refresh);

