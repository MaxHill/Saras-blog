require("typeface-roboto-slab");
require("typeface-raleway");

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Hemsidans har uppdaterats. Ladda om för att se senaste ändringarna?`
  );
  if (answer === true) {
    window.location.reload();
  }
};
