
// GBL variable 

var map;

var ipadd;// IP 
var ipver;  // IP version
var ipcity;  // IP city 
var ipregion;  // IP Region
var ipcountry; // IP Country
var ipcountry_name; // IP country_name
var ipcountry_code; // IP country_code_iso3

var lat ; // IP latitude
var long ; // IP longitude

var iptimezone; // IP timezone
var ipcountry_calling_code; // IP country_calling_code
var ipcurrency_name; // IP currency_name
var ipasn; // IP asn
var iporg; // IP org

// for error related to invalid IP and Private IP range

var reason;






// URL FOR API =>  https://ipapi.co/69.41.37.60/json/


// Allow only numbers and dot character in TextBox using JavaScript 
// https://www.aspsnippets.com/questions/171944/Allow-only-numbers-and-dot-character-in-TextBox-using-JavaScript/
 function onlyNumbersWithDot(e) {    
        
    var charCode;
    if (e.keyCode > 0) {
        charCode = e.which || e.keyCode;
    }
    else if (typeof (e.charCode) != "undefined") {
        charCode = e.which || e.keyCode;
    }
    if (charCode == 46)
        return true
    if (charCode > 31 && (charCode <48 || charCode > 57))
        return false;
    return true;
} // end 



// Burger menu using Jquery 

$('.ui.sidebar').sidebar({
    context: $('.ui.pushable.segment'),
    transition: 'overlay'
}).sidebar('attach events', '#mobile_item'); // end




// function to click search ICON 
document.getElementById("search_lnk").addEventListener('click', async function (){
    
    document.getElementById("ui_message").style.display = "none";//  remove message via index home page
    document.getElementById("map").style.visibility = "hidden";  // will make map image hidden 
    document.querySelector(".loader").style.visibility = "visible";  // will make loader image visible 
    var input_val = document.getElementById("ip_input").value;  // user input
    
  
 

    if (input_val == "") {
       
        // Sweet Alert
        Swal.fire({
            icon: 'error',
            title: 'Input is Empty !',
            text: 'Please enter a valid IP Address.',    
              
            confirmButtonColor: '#3e8ed0'          
        }) // End of Sweet Alert

        document.getElementById("input_main").classList.add('error'); // will change the color of input if error 


     } else {
          
         

          try {  // Try Catch for error when API breaks               
            

            // var ip = await fetch('https://ipapi.co/69.41.37.60/json/');
            var ip = await fetch(`https://ipapi.co/${input_val}/json/`);
            var ipinfo = await ip.json();

            var ip_error = await ipinfo.error;             
              
                    if (ip_error == true) {   // if Error message is available 
                        
                        // Sweet Alret for Private or non working IP range 
                        Swal.fire({
                            icon: 'error',
                            title: 'Error Occurred !',
                            text: `${ipinfo.reason}`,    
                            
                            confirmButtonColor: '#3e8ed0'          
                        }) // End of Sweet Alert

                        document.getElementById("input_main").classList.add('error'); // will change the color of input if error 



                    } else {  // If good result 

                        ipadd = await ipinfo.ip;  // IP 
                        ipver = await ipinfo.version;  // IP version
                        ipcity = await ipinfo.city;  // IP city 
                        ipregion = await ipinfo.region;  // IP Region
                        ipcountry = await ipinfo.country; // IP Country
                        ipcountry_name = await ipinfo.country_name; // IP country_name
                        ipcountry_code = await ipinfo.country_code.toLowerCase(); // IP country_code_iso3
                       
                        lat = await ipinfo.latitude; // IP latitude
                        long = await ipinfo.longitude; // IP longitude

                        iptimezone = await ipinfo.timezone; // IP timezone
                        ipcountry_calling_code = await ipinfo.country_calling_code; // IP country_calling_code
                        ipcurrency_name = await ipinfo.currency_name; // IP currency_name
                        ipasn = await ipinfo.asn; // IP asn
                        iporg = await ipinfo.org; // IP org

                        document.getElementById("map").style.visibility = "visible"; // will make map image visible 

                        document.getElementById("input_main").classList.remove('error'); // will remove the color of input if error 

                        // MAPS Section                        
                       

                        if (map != undefined) map.remove();  // remove Map 
                        map = L.map('map').setView([lat, long], 18);    // ADD Map from Lat and Long Value.                   



                        var myIcon = new L.Icon({
                            iconUrl: '/IMG/IP.png',
                            shadowUrl: '/LEAFLET/images/marker-shadow.png',
                            iconSize: [45, 40],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                            });




                        // Google Maps via discussion https://stackoverflow.com/questions/9394190/leaflet-map-api-with-google-satellite-layer
                        googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
                            maxZoom: 20,
                            subdomains:['mt0','mt1','mt2','mt3']
                        }).addTo(map);


                        googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
                        maxZoom: 20,
                        subdomains:['mt0','mt1','mt2','mt3']
                         });


                        googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                        maxZoom: 20,
                        subdomains:['mt0','mt1','mt2','mt3']
                        });

                        OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                         });
                     

                        Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                         });

                      


                        // Market and Popup 

                        var marker = L.marker([lat, long], {icon: myIcon}).addTo(map);

                        marker.bindPopup(`<div data-position="top left">
                        <p id="ipadd">IP Address:  <span id="strongtxt">${ipadd}</span></p>                                               
                        <p id="ipasn">ASN ID:  <span id="strongtxt">${ipasn}</span></p>                      
                        <p id="iporg">Powered By:                      
                        <span id="strongtxt">${iporg}</span></p>  
                        <br>                        
                        <p id="more_option">Click anywhere for more details.</p>  

                        </div>`).openPopup();


                        
                        // layer control 

                        var baseMaps = {
                            "Google Hybrid": googleHybrid,
                            "Google Streets": googleStreets, 
                            "Google Satellite": googleSat,                               
                            "Open Street Map": OpenStreetMap_Mapnik,                             
                            "World Imagery by GIS": Esri_WorldImagery
                        };  // END of base Map 
                        
                        var overlayMaps = {
                            "Marker Visibility": marker
                        }; // end of Over lay 

                        // Layer Render 
                        layerControl = L.control.layers(baseMaps, overlayMaps, {'collapsed':false}).addTo(map);

                        map.scrollWheelZoom.disable(); // disable zoom on mousewheel event.


        

                        // function on map click 

                        function onMapClick(e) {
                                // Sweet Alert
                                Swal.fire({
                                    icon: 'info',
                                    title: 'IP Information',
                                    html:  `
                                    <div class="swal_info_for_ip">
                                    <p id="swal_ipinfo">IP Address: <span id="strongtxt">${ipadd}</span>
                                    <br>  
                                    IP Version: <span id="strongtxt">${ipver}</span>
                                    <br>
                                    City Origin: <span id="strongtxt">${ipcity}</span>
                                    <br>
                                    Region: <span id="strongtxt">${ipregion}</span>
                                    <br>
                                    Country: <i class="${ipcountry_code} flag"></i><span id="strongtxt">${ipcountry_name}</span>
                                    <br>
                                    Timezone: <span id="strongtxt">${iptimezone}</span>
                                    <br>
                                    Calling Code: <span id="strongtxt">${ipcountry_calling_code}</span>
                                    <br>
                                    Currency: <span id="strongtxt">${ipcurrency_name}</span>
                                    <br>                                   
                                    Provider/Org: <span id="strongtxt">${iporg}</span>    
                                    <br>
                                    <a href="https://en.wikipedia.org/wiki/Autonomous_system_(Internet)#:~:text=Autonomous%20System%20Numbers%20are%20assigned,Assigned%20Numbers%20Authority%20(IANA)." target="_blank">ASN ID</a>: <span id="strongtxt">${ipasn}</span>
                                    </p>       
                                   </div>
                                    
                                    `,                                    
                                    
                                    confirmButtonColor: '#3e8ed0'          
                                }) // End of Sweet Alert

                        }  // end of map click function 
                        
                        map.on('click', onMapClick);  // click render

                        


                        // click icon aka Marker                         
                        document.querySelector(".leaflet-marker-icon ").addEventListener('click', function (){
                           onMapClick();
                            
                        }) // End of function to click Marker ICON

                    }  // end of if else block 

                   

        } catch (error) {
            // Sweet Alert
            Swal.fire({
            icon: 'error',
            title: 'Error Occurred !',
            text: `${error}`,    
              
            confirmButtonColor: '#3e8ed0'          
        }) // End of Sweet Alert
        } // end of Try Catch
    
     } // end of first aka Outside IF Else 

   
     document.querySelector(".loader").style.visibility = "hidden"; // Loader Hidden

}) // function to click search ICON || END 





// Function that will give more deails from API. via MARKER ICON




// key press event for ENTER key.
document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        document.getElementById("search_lnk").click();

        return false;
   }
}); // key press event for ENTER key. || END 



// What is my IP link
document.querySelector("#my_own_ip_link").addEventListener('click', async function (){

   
    document.getElementById("input_main").classList.add('loading'); // will add the loading via input box
    document.getElementById("ui_message").style.display = "none";//  remove message via index home page
    document.querySelector(".loader").style.visibility = "visible";  // will make loader image visible 

    try {

        var my_ip = await fetch(`https://ipapi.co/json/`);
        var my_own_ip = await my_ip.json();
       

        document.getElementById("ip_input").value = my_own_ip.ip;
        document.getElementById("search_lnk").click();


        
    } catch (error) {
          // Sweet Alert for rror 
          Swal.fire({
            icon: 'error',
            title: 'Error Occurred !',
            text: `${error}`, 
              
            confirmButtonColor: '#3e8ed0'          
        }) // End of Sweet Alert forerror
    }
         

    document.getElementById("input_main").classList.remove('loading'); // will remove the loading via input box
    document.querySelector(".loader").style.visibility = "hidden";  // will make loader image hide 
 
 }) // End of of what is my IP link

 

// Dev Info Sweet Alert

function devinfo(){
    Swal.fire({
        html: `<center>
               <img class="ui medium circular image" id="dev_img" src="/IMG/Jeng.gif">
               </center> 
               <br>               
               <p id="jeng">James Paul aka</p>
               <a href="https://github.com/rockstartraders" target="_blank">                 
               <strong id="portfolio">@rockstartraders</strong></a>
               <br>
               <div id="div_for_dev"> 
               <i class="address card icon" id="addresscard"></i>
               <a href="https://jamespaulespena.netlify.app/" target="_blank">                           
               <strong id="portfolio">Visit my Portfolio </strong></a> 
               <br>                       
               <p id="portfolio"><i class="envelope icon"></i><a href="mailto:jamespaulespea@gmail.com"> Contact Me</a></p>
               </div> 
               `,  // end of html for Developer info.
        
               
        confirmButtonColor: '#3e8ed0'  
      })
    
}// END of Dev Info Sweet Alert

   
