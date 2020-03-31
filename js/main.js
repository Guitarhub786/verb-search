const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
let states;

// Get states
const getStates = async () => {
  const res = await fetch('../data/verbs.json');
  states = await res.json();
};

// FIlter states
const searchStates = searchText => {
  // Get matches to current text input
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, 'gi');

    return state.root_e.match(regex) //|| state.abbr.match(regex);
  });

  console.log(matches);

  // Clear when input or matches are empty
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `<div class="card card-body mb-1">
    <h4>${match.name} (${match.root_e}) 
    <span class="text-primary">${match.root_e}</span></h4>
        
<table class="verb-table">
  <thead>
    <tr>
      <th class="form">${match.pp_f1}</th>
      <th class="form">${match.pp_m1}</th>
      <th class="form">${match.ap_def_f1}</th>
      <th class="form">${match.ap_def_m1}</th>
      <th class="form">${match.ap_indef_f1}</th>
      <th class="form">${match.ap_indef_m1}</th>
      <th class="form">${match.im1$f1}</th>
      <th class="form">${match.iif1}</th>
      <th class="form">${match.iim1}</th>
      <th class="form">${match.iiif1}</th>
      <th class="form">${match.iiim1}</th>
      <th class="form">${match.type}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="english">${match.pp_f1_e}#pleased, pleasing, pleasure, The pleased one, Lots of fun</td>
      <td class="english">${match.pp_m1_e}#pleased</td>
      <td class="english">${match.ap_def_f1_e}#The pleasing</td>
      <td class="english">${match.ap_def_m1_e}#The pleasing</td>
      <td class="english">${match.ap_indef_f1_e}#Pleasing</td>
      <td class="english">${match.ap_indef_m1_e}#Pleasing</td>
      <td class="english">${match.im1$f1_e}#I became pleased@</td>
      <td class="english">${match.iif1_e}#You became pleased@</td>
      <td class="english">${match.iim1_e}#You became pleased@</td>
      <td class="english">${match.iiif1_e}#She became pleased</td>
      <td class="english">${match.iiim1_e}#He became pleased</td>
      <td class="english">Root (${ match.root_e.toUpperCase()})</td>
    </tr>
    <tr>
      <td class="arabic">${match.pp_f1_a}#مَرْضِيَّةٌ</td>
      <td class="arabic">${match.pp_m1_a}#مَرْضِيٌّ</td>
      <td class="arabic">${match.ap_def_f1_a}#الرَّاضِيَةُ</td>
      <td class="arabic">${match.ap_def_m1_a}#الرَّاضِي</td>
      <td class="arabic">${match.ap_indef_f1_a}#رَاضِيَةٌ</td>
      <td class="arabic">${match.ap_indef_m1_a}#رَاضٍ</td>
      <td class="arabic">${match.im1$f1_a}#رَضِيْتُ</td>
      <td class="arabic">${match.iif1_a}#رَضِيْتِ</td>
      <td class="arabic">${match.iim1_a}#رَضِيْتَ#</td>
      <td class="arabic">${match.iiif1_a}#رَضِيَتْ</td>
      <td class="arabic">${match.iiim1_a}#رَضِيَ</td>
      <td class="arabic">${match.root_a}</td>
    </tr>



  </tbody>
</table>

   </div>`
      )
      .join('');
    matchList.innerHTML = html;
  }
};

window.addEventListener('DOMContentLoaded', getStates);
search.addEventListener('input', () => searchStates(search.value));