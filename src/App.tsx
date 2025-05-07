import { useState } from "react";

// Helper to calculate winner
function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  const isTie = !winner && squares.every(Boolean);

  function handleClick(idx: number) {
    if (squares[idx] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isTie) {
    status = "It's a tie!";
  } else {
    status = `Next: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f8fafc" }}>
      <h1 style={{ marginBottom: 16, color: "black" }}>Tic Tac Toe</h1>
      <div style={{ marginBottom: 12, fontSize: 20, minHeight: 28, color: "black" }}>{status}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 60px)", gap: 6, marginBottom: 16 }}>
        {squares.map((val, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            style={{
              width: 60,
              height: 60,
              fontSize: 32,
              background: "#fff",
              border: "2px solid #d1d5db",
              borderRadius: 6,
              cursor: val || winner ? "not-allowed" : "pointer",
              color: winner && winner === val ? "#22c55e" : "#0f172a",
              transition: "color 0.15s",
            }}
            aria-label={`cell ${idx}`}
            disabled={!!val || !!winner}
          >
            {val}
          </button>
        ))}
      </div>
      <button
        onClick={resetGame}
        style={{
          padding: "8px 18px",
          fontSize: 16,
          background: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
