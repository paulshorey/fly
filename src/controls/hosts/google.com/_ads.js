export default function gogole_ads() {
  setTimeout(lib, 1000);
}

function lib() {
  let num_search_results = Array.from(window.document.body.querySelectorAll('#search h3')).length;
  // hide ads and annoying content
  // let selectors = ['#taw','#botstuff','#bottomads']
  let botstuff = window.document.querySelector('#botstuff');
  if (botstuff) {
    botstuff.style.opacity = '0.33';
    // botstuff.style.display = "none"
    // botstuff.parentNode.removeChild(botstuff)
  }
  let bads = window.document.querySelector('#bottomads');
  if (bads) {
    // bads.style.opacity = "0.33"
    bads.style.display = 'none';
  }
  let tads = window.document.querySelector('#taw');
  if (tads) {
    // tads.style.opacity = "0.33"
    tads.style.display = 'none';
  }
  let adlists = window.document.querySelectorAll('#taw [role="list"], #taw [role="list"]');
  for (let adlist of Array.from(adlists)) {
    if (adlist) {
      // adlist.style.opacity = "0.33"
      adlist.style.display = 'none';
    }
  }
  let topStoriesTitle = document.querySelector('title-with-lhs-icon');
  if (topStoriesTitle) {
    try {
      topStoriesTitle.style.border = 'solid 5px red';
      topStoriesTitle.parentElement.parentElement.parentElement.style.display = 'none';
    } catch (e) {}
  }
  // let localResult = document.querySelector("g-img")
  // if (localResult) {
  //   try {
  //     localResult.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none"
  //   } catch (e) {}
  // }
  let accordions = window.document.querySelectorAll('g-accordion-expander');
  for (let accordion of Array.from(accordions)) {
    if (accordion) {
      // accordion.style.opacity = "0.33"
      accordion.style.display = 'none';
    }
  }
  let specials = window.document.querySelectorAll('g-section-with-header');
  for (let special of Array.from(specials)) {
    if (special) {
      // special.style.opacity = "0.33"
      special.parentElement.style.display = 'none';
    }
  }
  let expandables = window.document.querySelectorAll('g-expandable-container');
  for (let expandable of Array.from(expandables)) {
    if (expandable) {
      // expandable.style.opacity = "0.33"
      expandable.style.display = 'none';
    }
  }
  let nav = window.document.querySelector('#rcnt div[role="navigation"]');
  if (nav) {
    console.log('found nav', nav);
    nav.style.marginTop = '80px';
    nav.style.marginBottom = '100px';
  }
  {
    let aTags = document.querySelectorAll('h3 span');
    let searchText = 'People also ask';
    let found;
    for (let i = 0; i < aTags.length; i++) {
      if (aTags[i].textContent == searchText) {
        found = aTags[i];
        break;
      }
    }
    if (found) {
      found.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    }
  }

  let hrs = window.document.querySelectorAll('hr');
  for (let hr of Array.from(hrs)) {
    hr.style.display = 'none';
  }

  let gels = window.document.querySelectorAll('#search .g');
  for (let gel of Array.from(gels)) {
    gel.parentElement.style.marginBottom = '30px';
    // gel.nextElementSibling.style.marginBottom = "30px"
    // gel.previousElementSibling.style.marginBottom = "30px"
  }

  let extabar = window.document.querySelector('#extabar');
  let stats = window.document.querySelector('#result-stats');
  if (extabar) {
    if (num_search_results >= 20) {
      // OK good number of results
      // if (stats) {
      //   stats.innerHTML = num_search_results
      // }
      extabar.style.opacity = '0';
      extabar.style.height = '30px';
    } else {
      extabar.style.opacity = '0.67';
      extabar.style.height = '53.3px';
      // HELP the person set more than 10 results
      if (stats) {
        stats.innerHTML = `
          <div>
<!--            <div><b>You're currently only getting 10 search results at a time!</b></div>-->
            Open <a href="https://www.google.com/preferences">Google Preferences</a> to enable more than 10 results on each page.
          </div>
        `;
      }
    }
  }
}
