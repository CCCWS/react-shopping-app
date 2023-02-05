//https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743#file-usage-useprompt-react-router-dom-js

import { useContext, useEffect, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

const usePrompt = (message, check) => {
  const { navigator } = useContext(NavigationContext);

  const blocker = useCallback(
    (tx) => {
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );

  useEffect(() => {
    if (!check) return;

    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, check]);
};

export default usePrompt;
