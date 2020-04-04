
getFocus(); // input box set focus
const endpoint = './verbs.json';

const verbs = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => verbs.push(...data))

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => console.log(data))



function findMatches(wordToMatch, verbs) {
  return verbs.filter(word => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return word.key_words.match(regex) || word.root_e.match(regex)
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, verbs);
  // console.log(matchArray)
  const html = matchArray.map(word => {
    const regex = new RegExp(this.value, 'gi');

    // const keyWord = word.key_words.replace(regex, `<span class="h1">${this.value}</span>`);
    // const rootWord = word.root_e.replace(regex, `<span class="h1">${this.value}</span>`);


    const keyWord = word.key_words.replace(regex, (match) => `<span class="hl">${match}</span>`);
    const rootWord = word.root_e.replace(regex, (match) => `<span class="hl">${match}</span>`);

    let reverso = `https://conjugator.reverso.net/conjugation-arabic-verb-${word.iiim1_a}.html`

    return `
    <li>
    
    
    
    <table class="verb-table">
    
    <thead>
    
    <tr>
    <th  colspan="7" class="key-word"> <span><a href=${reverso} target="_blank">${word.iiim1_a} </a></span>${keyWord}</th>
   
    </tr>

    <tr>
    
    </tr>
    
    <tr>
    
    <th class="form">${word.vn}</th>
    <th class="form">${word.pp_m1}</th>
    <th class="form">${word.pi_m1}</th>
    <th class="form">${word.ap_indef_m1}</th>
    <th class="form">${word.iim1}</th>
    <th class="form">${word.iiim1}</th>
    <th class="form">${word.type}</th>
  
    </tr>
    </thead>
    <tbody>
    <tr>
    <td class="english">${word.vn_e}</td>
    <td class="english">${word.pp_m1_e}</td>
    <td class="english">${word.pi_m1_e}</td>
    <td class="english">${word.ap_indef_m1_e}</td>
    <td class="english">${word.iim1_e}</td>
    <td class="english">${word.iiim1_e}</td>
    <td class="english">Root: ${rootWord}</td>
   
    </tr>
    <tr>
    
    <td class="arabic">${word.vn_a}</td>
    <td class="arabic">${word.pp_m1_a}</td>
    <td class="arabic">${word.pi_m1_a}</td>
    <td class="arabic">${word.ap_indef_m1_a}</td>
    <td class="arabic">${word.iim1_a}</td>
    <td class="arabic">${word.iiim1_a}</td>
    <td class="arabic" id="root">${word.root_a}</td>
 
    </tr>
    
    
    
    </tbody>
    </table>
  </li>
  `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
function getFocus() {
  document.getElementById("search").focus();
}

