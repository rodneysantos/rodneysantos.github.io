import React from "react";
import * as css from "./sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <div className={css.sidebar}>
      <div className={css.stick}>
        <div className={css.brand}>XENON PHOTOGRAPHY</div>
      </div>
    </div>
  );
};

export default Sidebar;
