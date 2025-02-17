import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // Ignore clicks inside Ant Design Select dropdown
        if (
          document.querySelector(".ant-select-dropdown")?.contains(e.target) ||
          Array.from(document.querySelectorAll(".ant-picker-dropdown")).some(
            (dropdown) => dropdown.contains(e.target)
          )
        ) {
          return;
        }
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
