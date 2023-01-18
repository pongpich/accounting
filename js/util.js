function getURLParams(name) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(name);
}

// Pass the checkbox name to the function
function getCheckedBoxes(chkboxName) {
  var checkboxes = document.getElementsByName(chkboxName);
  var checkboxesChecked = [];
  // loop over them all
  for (var i = 0; i < checkboxes.length; i++) {
    // And stick the checked ones onto an array...
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i].value);
    }
  }
  // Return the array if it is non-empty, or null
  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

function formatThaiDate(sourceDate) {
  const thaiDate = sourceDate.replaceAll(' ', '');
  const datePart = thaiDate.trim().substr(0, 2);
  const yearPart = thaiDate.trim().substr(thaiDate.length - 4);
  const monthPart = thaiDate.replace(datePart, '').replace(yearPart, '').trim();
  const centralMonth = convertFromThaiMonth(monthPart);
  const centralYear = convertFromThaiYear(yearPart);
  return centralYear + centralMonth + datePart;
}

function convertFromThaiMonth(thaiMonth) {
  const monthPart = thaiMonth.replaceAll('.', '');
  let resultMonth;
  switch (monthPart) {
    case 'มค':
      resultMonth = '01';
      break;
    case 'กพ':
      resultMonth = '02';
      break;
    case 'มีค':
      resultMonth = '03';
      break;
    case 'เมย':
      resultMonth = '04';
      break;
    case 'พค':
      resultMonth = '05';
      break;
    case 'มิย':
      resultMonth = '06';
      break;
    case 'กค':
      resultMonth = '07';
      break;
    case 'สค':
      resultMonth = '08';
      break;
    case 'กย':
      resultMonth = '09';
      break;
    case 'ตค':
      resultMonth = '10';
      break;
    case 'พย':
      resultMonth = '11';
      break;
    case 'ธค':
      resultMonth = '12';
      break;
    default:
      resultMonth = '01';
      break;
  }
  return resultMonth;
}

function convertFromThaiYear(thaiYear) {
  const yearInt = parseFloat(thaiYear);
  if (yearInt < 2300) {
    return thaiYear
  } else {
    return (yearInt - 543).toString();
  }
}

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}


function uuidv4() {
  let d = new Date().getTime();//Timestamp
	let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			let r = Math.random() * 16;//random number between 0 and 16
			if(d > 0){//Use timestamp until depleted
					r = (d + r)%16 | 0;
					d = Math.floor(d/16);
			} else {//Use microseconds since page-load if supported
					r = (d2 + r)%16 | 0;
					d2 = Math.floor(d2/16);
			}
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
}

function setProfile(data) {
  localStorage.setItem('profile', JSON.stringify(data));
}

function getProfile() {
  const profile = JSON.parse(localStorage.getItem('profile'));
  return profile;
}

function checkData() {
  const profile = getProfile();
  console.log("inside checkData:", profile);
  if (!profile || !profile.team_name) {
    window.location = "/index.html";
  }
  return profile;
}

function getBankName(bankCode, bankData) {
  let bank = bankData.find(x => x.code === bankCode);

  return bank && bank.name ? bank.name : "";
}



//รหัสโปรแกรมสำหรับเลือกว่าจะสมัครรุ่นไหน โปรแกรมอะไร
const serviceUrl = 'https://api.ccrdiet.co/coredev';//'http://localhost:3003';//
const slipUrl = 'https://node.bebefitroutine.com';
const bsfUrl = 'https://api.planforfit.com/bebefit';
const spreadsheetId = '1RuPrZhQFIYPOyMSrCQVpFwFt42uy2D6rNAEfgFOvPwk';