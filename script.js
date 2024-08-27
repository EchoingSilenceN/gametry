document.addEventListener("DOMContentLoaded", function () {
    const puzzleContainer = document.getElementById('puzzle-container');
    const tiles = Array.from(document.getElementsByClassName('tile'));
    const shuffleButton = document.getElementById('shuffle');
    const emptyTile = document.getElementById('empty');

    // Get the current position of a tile
    function getTilePosition(tile) {
        return {
            row: Math.floor(tile.offsetTop / 100),
            col: Math.floor(tile.offsetLeft / 100),
        };
    }

    // Check if a tile can be moved (is adjacent to the empty space)
    function canMoveTile(tile) {
        const tilePos = getTilePosition(tile);
        const emptyPos = getTilePosition(emptyTile);
        return (Math.abs(tilePos.row - emptyPos.row) === 1 && tilePos.col === emptyPos.col) ||
               (Math.abs(tilePos.col - emptyPos.col) === 1 && tilePos.row === emptyPos.row);
    }

    // Move the tile into the empty space
    function moveTile(tile) {
        const emptyPos = { top: emptyTile.style.top, left: emptyTile.style.left };
        emptyTile.style.top = tile.style.top;
        emptyTile.style.left = tile.style.left;
        tile.style.top = emptyPos.top;
        tile.style.left = emptyPos.left;
    }

    // Shuffle the puzzle tiles
    function shuffleTiles() {
        for (let i = 0; i < 100; i++) {
            const movableTiles = tiles.filter(tile => canMoveTile(tile));
            const randomTile = movableTiles[Math.floor(Math.random() * movableTiles.length)];
            moveTile(randomTile);
        }
    }

    // Set up initial positions for tiles
    tiles.forEach((tile, index) => {
        tile.style.top = `${Math.floor(index / 3) * 100}px`;
        tile.style.left = `${(index % 3) * 100}px`;
        tile.draggable = true;
    });

    // Add drag and drop event listeners to tiles
    tiles.forEach(tile => {
        tile.addEventListener('dragstart', dragStart);
        tile.addEventListener('dragover', dragOver);
        tile.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    function dragOver(e) {
        e.preventDefault(); // Necessary for the drop event to work
    }

    function drop(e) {
        e.preventDefault();
        const tileId = e.dataTransfer.getData('text/plain');
        const tile = document.getElementById(tileId);
        if (canMoveTile(tile)) {
            moveTile(tile);
        }
    }

    // Shuffle the puzzle immediately after the page loads
    shuffleTiles();

    // Add event listener to shuffle button
    shuffleButton.addEventListener('click', shuffleTiles);
});
