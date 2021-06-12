import React, { useEffect, useRef } from 'react';


const useEffectAfterRender = (func, dependencies) => {
  const didMount = useRef(0);

  useEffect(() => {
    // if the component has rendered once already, it will run the function inside the useEffect
    if (didMount.current > 1) {
      func()
    } else {
      didMount.current++;
    }
  }, dependencies)
}

export default useEffectAfterRender;