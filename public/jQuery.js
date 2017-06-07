
// This func is used to reattach the event listners after updating the dom
function attachJQuery() {



    // listens to Options click,
    // when clicked updates the state and the the dom
    $('.options').click(() => {
        if (!JSON.parse(localStorage.getItem('isDisplayed'))) {
            localStorage.setItem("isDisplayed", true);
            document.getElementById('dropDownID').className = 'displayNone';
            setTimeout(() => { document.getElementById('dropDownID').className += ' display'; }, 100)
            localStorage.setItem('isFirstClick', true);
            document.addEventListener('click', addOutSideEventListener);
            $('#abSelect').change(onSelectChange);
        }
    })



    // event listner for the Quantity input
    $('#quantityInput').on('change', (event) => {
        let val = parseInt(event.target.value); // parses the value either to a Int or to NaN
        if (val && (val > 0)) { // checks if the val is Int or NaN , and that its positive
            localStorage.setItem("quantity", val);
            localStorage.setItem("currentIndex", 0 );
            document.getElementById('quantityInput').className = 'quantityInput'
            updateDom();
        } else {
            alert(`Please Type A Positive Intger`)
        }
    })



    // Even listner for the left arrow
    $('.leftArrow').click(() => {
        let currentIndex = Number(localStorage.getItem('currentIndex'));
        if (((currentIndex % 3) || (currentIndex / 3)) && (currentIndex >= 3)) {
            currentIndex -= 3;
            localStorage.setItem('currentIndex', currentIndex);
            updateDom();
        } else {
            alert('There Is No Where Backwords To Go')
        }
    })



    // Even listner for the right arrow
    $('.rightArrow').click(() => {
        let currentIndex = Number(localStorage.getItem('currentIndex'));
        let quantity = Number(localStorage.getItem('quantity'));
        if ((quantity - currentIndex) > 3) {
            currentIndex += 3;
            localStorage.setItem('currentIndex', currentIndex);
            updateDom();
        } else {
            alert('These Are The Last Items We Got Check The Quantity Input To Change That')
        }
    })
}


// $(document).ready(attachJQuery);