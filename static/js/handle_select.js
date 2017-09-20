window.HandleSelect = (function($) {
    function getSelectedText() {
        var text = "";
        if (window.getSelection){
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    function handleIconResponse(data){
        debugger;
    }

    function openPopup(text) {
        var holder = handleIconResponse;
        $('#popup-results').empty();
        $('#popup-results').append(text);
        $.getJSON("http://127.0.0.1:5000/icon/", {
            icon: text
        }, function(response){
            holder(response.data);
        });
        // $.magnificPopup.open({
        //     items: {
        //         src: '#results-popup',
        //         type: 'inline'
        //     }
        // });
    }

    function setWordLink(response, value) {
        console.log(value);
        console.log(response);
    }

    function parseWordsToIcons(selection, element) {
        if (selection == undefined && element !== undefined) {
            var wordArray = $(element).text().split(' ');
        } else if (selection !== undefined) {
            var wordArray = selection.split(' ');
        }
        console.log(wordArray);
        $.each(wordArray, function(i, value) {
            var word = value;
            console.log(value);
            $.getJSON("/icon/", {
                icon: value
            }, function(response) {
                debugger;
                var wordPass = word;
                setWordLink(response.icons, wordPass);
            });

        });
    }

    return {
        init: function() {
            $('.js-story-text > p').each(function() {
                parseWordsToIcons(undefined, this);
            });
            $('.js-story-text').mouseup(function(e) {
                var selected = getSelectedText();
                if (selected !== "") {
                    parseWordsToIcons(selected, undefined);
                }
            });
        }
    };
}(jQuery));