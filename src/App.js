import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [gridSize, setGridSize] = useState(5);
  const [grid, setGrid] = useState([[0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0]]);
  const [groupedCells, setGroupedCells] = useState([]);
  const [count, setCount] = useState('');
  const [clickedCell, setClickedCell] = useState('');
  const [hoveredCell, setHoveredCell] = useState('');
  const [clicked, setClicked] = useState(false);
  const [highlightColor, setHighlightColor] = useState("#caa69e");
  const [bgColor, setBgColor] = useState("#5d4954");
  useEffect(() => {
    let newGrid = Array(gridSize).fill().map(() =>
      Array(gridSize).fill().map(() => Math.round(Math.random())));
    setGrid(newGrid);
    setClickedCell([]);
    setGroupedCells([]);
    setCount('');
  }, [gridSize])

  useEffect(() => {
    if (clicked) {
      setCount(groupedCells.length ? groupedCells.length.toString() : '');
    }
  }, [groupedCells, clicked])

  useEffect(() => {
    function findNeighbours(x, y) {
      if (x < 0 || x >= gridSize || y < 0 || y >= gridSize || grid[x][y] === 0 || visited.includes(x + ' ' + y)) {
        return
      }

      if (grid[x][y] === 1) {
        visited.push(x + ' ' + y)
        setGroupedCells([...visited]);
      }
      findNeighbours(x - 1, y)
      findNeighbours(x, y + 1)
      findNeighbours(x + 1, y)
      findNeighbours(x, y - 1)
    }
    let visited = [];
    if (hoveredCell.length && !(groupedCells.includes(hoveredCell[0] + ' ' + hoveredCell[1]))) {
      findNeighbours(hoveredCell[0], hoveredCell[1]);
    }

  }, [hoveredCell, gridSize, grid, groupedCells])

  function handleHighlightColorChange(e) {
    setHighlightColor(e.target.value);
  }
  function handleBgColorChange(e) {
    setBgColor(e.target.value);
  }
  return (
    <div className="app">
      <div className="container">
        <div className="controls-view">
          Grid Size:  <input type="range" min="5" max="10" step="1" value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))} />
          Background Color:  <input type="color" id="favcolor" name="favcolor" onChange={handleBgColorChange} value={bgColor}></input>
          Highlight on Hover:  <input type="color" id="favcolor" name="favcolor" onChange={handleHighlightColorChange} value={highlightColor}></input>
        </div>
        <div className="grid-view">
          {grid.map((row, i) => {
            return (
              <div key={i} className="grid-row">
                {row.map((value, j) => {
                  return (<div key={j} onMouseEnter={() => {
                    if (value === 1) {
                      setHoveredCell([i, j]);
                      setClicked(false);
                    } else {
                      setGroupedCells([]);
                    }
                  }}
                    onMouseLeave={() => {
                      setHoveredCell([]);
                      setClicked(false);
                    }}
                    onClick={() => {
                      if (value === 1) {
                        setClicked(true);
                        setHoveredCell([i, j]);
                        setClickedCell([i, j]);
                      }
                    }}
                    className={"cell" + (value === 1 ? " pointer" : "")}
                    style={{ backgroundColor: groupedCells.includes(i + ' ' + j) ? highlightColor : value === 1 ? bgColor : '' }}>
                    {clickedCell[0] === i && clickedCell[1] === j ? count : ' '}
                  </div>);
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
