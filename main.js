let cols = 16;
let rows = 16;
let current;

let grid = [];
let ids = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12', 'g13', 'g14', 'g15', 'g16', 'g17', 'g18', 'g19', 'g20', 'g21', 'g22', 'g23', 'g24', 'g25', 'g26', 'g27', 'g28', 'g29', 'g30', 'g31', 'g32', 'g33', 'g34', 'g35', 'g36', 'g37', 'g38', 'g39', 'g40', 'g41', 'g42', 'g43', 'g44', 'g45', 'g46', 'g47', 'g48', 'g49', 'g50', 'g51', 'g52', 'g53', 'g54', 'g55', 'g56', 'g57', 'g58', 'g59', 'g60', 'g61', 'g62', 'g63', 'g64', 'g65', 'g66', 'g67', 'g68', 'g69', 'g70', 'g71', 'g72', 'g73', 'g74', 'g75', 'g76', 'g77', 'g78', 'g79', 'g80', 'g81', 'g82', 'g83', 'g84', 'g85', 'g86', 'g87', 'g88', 'g89', 'g90', 'g91', 'g92', 'g93', 'g94', 'g95', 'g96', 'g97', 'g98', 'g99', 'g100', 'g101', 'g102', 'g103', 'g104', 'g105', 'g106', 'g107', 'g108', 'g109', 'g110', 'g111', 'g112', 'g113', 'g114', 'g115', 'g116', 'g117', 'g118', 'g119', 'g120', 'g121', 'g122', 'g123', 'g124', 'g125', 'g126', 'g127', 'g128', 'g129', 'g130', 'g131', 'g132', 'g133', 'g134', 'g135', 'g136', 'g137', 'g138', 'g139', 'g140', 'g141', 'g142', 'g143', 'g144', 'g145', 'g146', 'g147', 'g148', 'g149', 'g150', 'g151', 'g152', 'g153', 'g154', 'g155', 'g156', 'g157', 'g158', 'g159', 'g160', 'g161', 'g162', 'g163', 'g164', 'g165', 'g166', 'g167', 'g168', 'g169', 'g170', 'g171', 'g172', 'g173', 'g174', 'g175', 'g176', 'g177', 'g178', 'g179', 'g180', 'g181', 'g182', 'g183', 'g184', 'g185', 'g186', 'g187', 'g188', 'g189', 'g190', 'g191', 'g192', 'g193', 'g194', 'g195', 'g196', 'g197', 'g198', 'g199', 'g200', 'g201', 'g202', 'g203', 'g204', 'g205', 'g206', 'g207', 'g208', 'g209', 'g210', 'g211', 'g212', 'g213', 'g214', 'g215', 'g216', 'g217', 'g218', 'g219', 'g220', 'g221', 'g222', 'g223', 'g224', 'g225', 'g226', 'g227', 'g228', 'g229', 'g230', 'g231', 'g232', 'g233', 'g234', 'g235', 'g236', 'g237', 'g238', 'g239', 'g240', 'g241', 'g242', 'g243', 'g244', 'g245', 'g246', 'g247', 'g248', 'g249', 'g250', 'g251', 'g252', 'g253', 'g254', 'g255', 'g256', 'g257', 'g258', 'g259', 'g260', 'g261', 'g262', 'g263', 'g264'];
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

