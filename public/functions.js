// Gets the state of the page from local storage
function getState() {
    return {
        quantity: localStorage.getItem("quantity"),
        aOrB: localStorage.getItem("aOrB"),
        isDisplayed: localStorage.getItem("isDisplayed"),
        currentIndex: localStorage.getItem("currentIndex")
    }
}


// This is the event listner that is added when OBJ2 gets displayed,
// is listens to evry click on the document and if the click is outside of OBJ2
// it hides OBJ2 and removes the event listner 
function addOutSideEventListener(event) {
    var specifiedElement = document.getElementById('dropDownID');
    let isFirstClick = JSON.parse(localStorage.getItem('isFirstClick'));
    var isClickInside = specifiedElement.contains(event.target);
    if (!isClickInside && !isFirstClick) {
        localStorage.setItem('isDisplayed', false);
        $('#dropDownID').addClass('displayNoneTransition');
        document.removeEventListener('click', addOutSideEventListener);
    } else {
        if (isFirstClick) {
            localStorage.setItem('isFirstClick', false);
        }
    }
}

// This function updates the Dom with the currnt state 
function updateDom() {
    let page = document.getElementById('page').innerHTML;
    let state = getState();
    let html = ejs.compile(page)({ state });
    document.body.innerHTML = html;
    attachJQuery();
}


// This is a event listner for a Dropdown change that updates the state and the the Dom
function onSelectChange(event) {
    const val = event.target.value;
    if (val === 'A' || val === 'B') {
        localStorage.setItem('aOrB', val);
        localStorage.setItem('isDisplayed', false);
        $('#dropDownID').addClass('displayNoneTransition');
        setTimeout(()=>{updateDom();},300)
    }else{
        console.log('Something went wrong')
    }
}


