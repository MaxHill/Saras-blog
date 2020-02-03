require("typeface-raleway");
require("typeface-merriweather");

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Hemsidans har uppdaterats. Ladda om för att se senaste ändringarna?`
  );
  if (answer === true) {
    window.location.reload();
  }
};
