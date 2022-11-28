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
  for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
     }
  }
  // Return the array if it is non-empty, or null
  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

//รหัสโปรแกรมสำหรับเลือกว่าจะสมัครรุ่นไหน โปรแกรมอะไร
const serviceUrl = 'https://api.ccrdiet.co/coredev';
const slipUrl = 'https://node.bebefitroutine.com';