// Check if country is in Stormgain's allowed country list
function checkGEO() {
    fetch('https://extreme-ip-lookup.com/json/')
        .then(response => response.json())
        .then(data => {
            if (countriesBlackList.includes(data.countryCode)) {
                allowedCountry = false;
            } else {
                console.log("true");
                allowedCountry = true;    
            }
        })
        .catch(console.error);

}

let allowedCountry;
const countriesBlackList = ["US", "CA", "JP", "AF", "BA", "GY", "IQ", "LA", "YE", "VU", "UG", "SY", "ET", "LK", "TT", "TN", "IR", "KP" ]
// checkGEO();