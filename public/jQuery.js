
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


    //<---- Quantity Input Listners Start ------->

    $('#quantityInput').focus((event) => { // sets some stuff if its the first time its focused
        let wasInputed = JSON.parse(localStorage.getItem('wasInputed'));
        if (!wasInputed) {
            localStorage.setItem('wasInputed', true);
            document.getElementById('quantityInput').className = 'quantityInput';
            $('#quantityInput').val('')
        }
    })

    $('#quantityInput').on('change input', (event) => { // makes sure that value is a positive Int and updates the dom
        let val = parseInt(event.target.value); // parses the value either to a Int or to NaN
        if (val > 0) {
            localStorage.setItem("quantity", val);
            localStorage.setItem("currentIndex", 0);
            updateDom();
            var strLength = $('#quantityInput').val().length * 2;
            $('#quantityInput').focus(); // focuss the user back to the input after the dom update
            $('#quantityInput')[0].setSelectionRange(strLength, strLength); // sets the user at the end of the string value
        } else {
            if ($('#quantityInput').val() !== '') {
                $('#quantityInput').val('')
                alert(`Please Type A Positive Intger`);
                localStorage.setItem('byOnChange' , true );
            }
        }
    })

    $('#quantityInput').blur(() => { // off focuss the user because the on change will focus the user back to the input
        $('#quantityInput').focusout();
        let byOnChange = JSON.parse( localStorage.getItem('byOnChange')); // checking if the listner was trigered because of the alert or the user
        if (($('#quantityInput').val() === '') && !byOnChange) {
            localStorage.setItem("quantity", 0);
            localStorage.setItem("currentIndex", 0);
            localStorage.setItem('wasInputed', false);
            updateDom();
        }
        localStorage.setItem('byOnChange', false);
    })

    //<---- Quantity Input Listners End ------->


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