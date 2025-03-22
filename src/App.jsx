import React, { useState } from "react";

const App = () => {
  // Initialize a 3x3 matrix with null values
  const [matrix, setMatrix] = useState(
    Array(3)
      .fill()
      .map(() => Array(3).fill(null))
  );
  const [clickOrder, setClickOrder] = useState([]); // Track order of clicks

  // Handle box click
  const handleClick = (row, col) => {
    if (matrix[row][col] === null) {
      // Update the matrix with green color for the clicked box
      const newMatrix = [...matrix];
      newMatrix[row][col] = "green";
      setMatrix(newMatrix);

      // Update the click order
      const newClickOrder = [...clickOrder, { row, col }];
      setClickOrder(newClickOrder);

      // If all boxes are clicked, change colors to orange in sequence
      if (newClickOrder.length === 9) {
        changeToOrange(newClickOrder);
      }
    }
  };

  // Change colors to orange in sequence
  const changeToOrange = (order) => {
    order.forEach(({ row, col }, i) => {
      setTimeout(() => {
        setMatrix((prevMatrix) => {
          const newMatrix = [...prevMatrix];
          newMatrix[row][col] = "orange";
          return newMatrix;
        });
      }, i * 500); // Delay each change by 500ms
    });
  };

  return (
    <div style={{justifyContent:"center", alignItems:"center"}}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid black",
                backgroundColor: color || "white",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
        
      ))}
    </div>
    </div>
  );
};

export default App;