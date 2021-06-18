import { useState, useEffect } from "react";

const useClickData = () => {
  const [ clickData, setClickData ] = useState(null);
  const [ time, setTime ] = useState(null);
  const [ widget, setWidget ] = useState(null)

  const recordMouseClick = (e) => {
    const element = e.target;
    const module = e.target.name;
    let currentTime = Date().toLocaleString();
    setClickData(element);
    setTime(currentTime);
    setWidget(widget);
  }

  useEffect(() => {
    window.addEventListener("click", recordMouseClick)
    return () => window.removeEventListener("click", recordMouseClick);
  }, []);

  return { clickData, time, widget };
};

export default useClickData;