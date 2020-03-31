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
    return state.name.match(regex) || state.abbr.match(regex);
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
    <h4>${match.name} (${match.abbr}) 
    <span class="text-primary">${match.capital}</span></h4>
    <small>Lat: ${match.lat} / Long: ${match.long}</small>
    <br>
    <h3><a href="${match.capital}" target="_blank">${match.name}</a></h3>
    <h4>${match.html}</h4>
    <h4>${match.test}</h4>
    
<table style="font-size: 85%; border-collapse: collapse; border: 1px solid black;">
  <thead>
    <tr>
      <th class="form">PP. F1</th>
      <th class="form">PP. M1</th>
      <th class="form">AP DEF. F1</th>
      <th class="form">AP DEF. M1</th>
      <th class="form">AP INDEF. F1</th>
      <th class="form">AP INDEF. M1</th>
      <th class="form">IM1+F1</th>
      <th class="form">IIF1</th>
      <th class="form">IIM1</th>
      <th class="form">IIIF1</th>
      <th class="form">IIIM1</th>
      <th class="form">A3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="english">pleased, pleasing, pleasure, The pleased one, Lots of fun</td>
      <td class="english">pleased</td>
      <td class="english">The pleasing</td>
      <td class="english">The pleasing</td>
      <td class="english">Pleasing</td>
      <td class="english">Pleasing</td>
      <td class="english">I became pleased</td>
      <td class="english">You became pleased</td>
      <td class="english">You became pleased</td>
      <td class="english">She became pleased</td>
      <td class="english">He became pleased</td>
      <td class="english">root</td>
    </tr>
    <tr>
      <td class="arabic">مَرْضِيَّةٌ</td>
      <td class="arabic">مَرْضِيٌّ</td>
      <td class="arabic">الرَّاضِيَةُ</td>
      <td class="arabic">الرَّاضِي</td>
      <td class="arabic">رَاضِيَةٌ</td>
      <td class="arabic">رَاضٍ</td>
      <td class="arabic">رَضِيْتُ</td>
      <td class="arabic">رَضِيْتِ</td>
      <td class="arabic">رَضِيْتَ</td>
      <td class="arabic">رَضِيَتْ</td>
      <td class="arabic">رَضِيَ</td>
      <td class="arabic">رضي</td>
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