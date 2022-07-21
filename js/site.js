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
        let ddItem = ddItemNode.querySelector("a");
        ddItem.textContent = cityName;
        eventDD.appendChild(ddItemNode);
    }
    displayStats(currentEvents);
    //display the stats for the selected city
    function displayStats(currentEvents) {
        let total = 0;
        let average = 0;
        let most = 0;
        let least = 0;

        for (let total = 0; currentEvents < currentEvents.length; index++) {
            let total = currentEvents[index];
            
        }

    }
}