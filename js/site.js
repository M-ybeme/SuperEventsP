const events = [{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
  },
];

//calls function on load
buildDD();
//driver function
//adds the city to the dropdown
function buildDD() {
    
    //get ul menue for the drop down
    let eventDD = document.getElementById("eventDropDown");
    //clear out any li before adding
    eventDD.innerHTML = "";    
    //use the template
    let ddItemTemplate = document.getElementById("cityDD-template");
    //import the node
    let ddItemNode = document.importNode(ddItemTemplate.content, true);
    //<li> <a></a></li>
    let ddItem = ddItemNode.querySelector("a");
    //<a></a>
    ddItem.textContent = "All";
    ddItem.setAttribute("data-string", "All");
    //<a>all</a>
    //<li><a>All</a></li>
    //this writes to the node to the page
    eventDD.appendChild(ddItemNode);

    let currentEvents = events;


    //spred operoator makes new set of unique properties(no repeating properties)
    let distinctCities = [... new Set(currentEvents.map((event) => event.city))];
    
    for (let index = 0; index < distinctCities.length; index++) {
        let cityName = distinctCities[index];
        ddItemNode = document.importNode(ddItemTemplate.content, true);
        ddItem = ddItemNode.querySelector("a");
        ddItem.textContent = cityName;
        ddItem.setAttribute("data-string", cityName);
        eventDD.appendChild(ddItemNode);
    }
  displayStats(currentEvents);
  displayData(currentEvents);
}

displayStats(currentEvents);
//display the stats for the selected city
function displayStats(currentEvents) {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;

    
    for (let index = 0; index < currentEvents.length; index++) {

        let attendance = currentEvents[index].attendance;
        total += attendance;

        //most is 0 att (<) is 2400000
        //determine the most attendance 
        if (most < attendance) {
            most = attendance;
        }
        //determin least attended
        // -1 > 240000 or is -1 < 0
        if (least > attendance  || least < 0) {
            least = attendance;
        }
        document.getElementById("statsHeader").innerHTML = `stats for${currentEvents[index]}.city`;
    }
    average = total / currentEvents.length;
    
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        "en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    );

}
//remember "this" is being passed in as "element"
function getEvents(element) {

    let city = element.getAttribute("data-string");
    
    let currentEvents = getEventData();

    //if city is all no filter needed
    if (city != 'All') {
        //same as => i key
        currentEvents = currentEvents.filter(function (event) {
            if (event.city == city) {
                return event;
            }
        });

    }
  displayStats(currentEvents);
  displayData(currentEvents);

}

function getEventData() {
    
    currentEvents = JSON.parse(localStorage.getItem("eventData"));
    if (currentEvents == null) {
        currentEvents = events;

        localStorage.setItem("eventData", JSON.stringify(currentEvents));
    }

    displayStats(currentEvents);


}
//display bottom table function
function displayData(currentEvents) {
    let eventTemplate = document.getElementById("eventData-template");
    let eventBody = document.getElementById("eventBody");
    eventBody.innerHTML = "";
    
  for (let index = 0; index < currentEvents.length; index++) {

    //<tr><td>......</tr>
    let eventNode = document.importNode(eventTemplate.content, true);

    let eventItems = eventNode.querySelectorAll("td");

    eventItems[0].textContent = currentEvents[index].event;
    eventItems[1].textContent = currentEvents[index].city;
    eventItems[2].textContent = currentEvents[index].state;
    eventItems[3].textContent = currentEvents[index].attendance.toLocaleString();
    eventItems[4].textContent = new Date(currentEvents[index].date).toLocaleDateString();
    
    eventBody.appendChild(eventNode);

  }
  displayData(currentEvents);

}

//saves event data from modal
function saveEventData() {
  let currentEvents = getEventData();

  let eventObj = {
    event: "",
    city: "",
    state: "",
    attendance: 0,
    date: "",
  };

  eventObj.event = document.getElementById("newEventName").value;
  eventObj.city = document.getElementById("newEventCity").value;
  
  let selectedState = document.getElementById("newEventState");
  eventObj.state = selectedState.options[selectedState.selectedIndex].text;

  let attendance = document.getElementById("newEventAttendance").value;
  attendance = parseInt(attendance);
  eventObj.attendance = attendance;

  let eventDate = document.getElementById("newEventDate").value;
  let formattedEventDate = `${eventDate} 00:00`;
  
  eventObj.date = new Date(formattedEventDate).toLocaleDateString();

  currentEvents.push(eventObj);

  localStorage.setItem("eventData", JSON.stringify(currentEvents));

  //will reset dropdown, displaystats, displaydata
  buildDD();

}