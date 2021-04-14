import React from "react";
import { Link } from "react-router-dom";

function Name({ name, handle }) {
  return (
    <div>
      <h1>
        <Link
          to={`/user/${handle}`}
          style={{ textDecoration: "none", color: "gray" }}>
          {name}
        </Link>
      </h1>
    </div>
  );
}

export default Name;
