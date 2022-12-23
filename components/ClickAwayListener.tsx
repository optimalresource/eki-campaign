import React, { HTMLAttributes, useEffect, useRef } from "react";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "ref"> {
  onClickAway: () => void;
}
function ClickAwayListener({ onClickAway, ...props }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    /* A Function that is used to detect if the user clicks outside of the menu. */
    const handleClickOutsideMenu = (e: MouseEvent) => {
      containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        onClickAway();
    };
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [onClickAway]);
  return <div ref={containerRef} {...props} />;
}

export default ClickAwayListener;
