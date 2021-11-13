import React, { ReactElement, useEffect, useState } from "react";

interface Props {
  description: string;
  defaultCount: number;
}

export function Counter({ description, defaultCount }: Props): ReactElement {
  const [count, setCount] = useState(defaultCount);

  const [incrementor, setIncrementor] = useState("1");
  const [bigEnough, setBigEnough] = useState(defaultCount >= 15);

  useEffect(() => {
    let active = true;
    if (count >= 15) {
      setTimeout(() => {
        if (active) {
          setBigEnough(true);
        }
      }, 300);
    }

    return () => {
      active = false;
    };
  });

  return (
    <div>
      <h2>
        DESC: {description} - DC: {defaultCount}
      </h2>
      <button
        aria-label="decrement"
        onClick={() => setCount((cur) => cur - parseInt(incrementor))}
      >
        -
      </button>
      <label htmlFor="val">
        incrementInput
        <input
          type="text"
          id="val"
          value={incrementor}
          onChange={(e) => {
            setIncrementor(e.target.value);
          }}
        />
      </label>
      Current Count: {count}
      <button
        aria-label="increment"
        onClick={() =>
          setTimeout(
            () => setCount((count) => count + parseInt(incrementor)),
            900
          )
        }
      >
        +
      </button>
      {bigEnough ? null : <div>Hello small enough to show</div>}
    </div>
  );
}
