// ==UserScript==
// @name         Premium Forum Extras - Sort it!
// @namespace    https://theeventscalendar.com/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @include      https://theeventscalendar.com/wp-admin/edit.php?post_type=topic&page=tribe-support-queues*
// @exclude      https://theeventscalendar.com/wp-admin/edit.php?post_type=topic&page=tribe-support-queues&saved_filter=1343915*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log( 'start' );
    var times = document.getElementsByClassName( 'column-activity' );

    jQuery( '#the-list' ).children().addClass( 'the-list-row' );
    var rows = document.getElementsByClassName( 'the-list-row' );

    var myArray = [];

    for ( var i = 0; i < times.length ; i++ ) {

        var time = times[i].innerHTML;
        var timeint;

        // Skip Week, Month, first and last row
        if ( time.search( 'W' ) >= 0 || time.search( 'M' ) >= 0 || time.search( 'Activity' ) >= 0 ) {
            continue;
        }
        //console.log( time );

        // Check for Day
        if ( time.search( /(\d)(D)(\s)/g ) >= 0 ) {
            timeint = time.replace( /(\d)(D)(\s)/g, '$1.' );
        }
        // If not older than a day, add 0.
        else {
            timeint = '0.' + time;
        }

        //console.log( timeint );

        //if ( time.search( /(\d)(D)(\s)/g ) >= 0 ) {
        // (\d{2})(h)(\s)

        // Replacing double digit hours
        //timeint = timeint.replace( /(\d{2})(h)(\s{0,1})/g, '$1' );

        // Replacing double digit hours and single digit minutes
        timeint = timeint.replace( /(\d{2})(h)(\s)(\d{1})(m)/g, '$1' + '0' + '$4' );

        //console.log( timeint );

        // Replacing double digit hours and double digit minutes
        timeint = timeint.replace( /(\d{2})(h)(\s)(\d{2})(m)/g, '$1' + '$4' );

        //console.log( timeint );

        // Replacing single digit hours and single digit minutes
        timeint = timeint.replace( /(\.)(\d{1})(h)(\s)(\d{1})(m)/g, '$1' + '0' + '$2' + '0' + '$5' );

        // Replacing single digit hours and double digit minutes
        timeint = timeint.replace( /(\.)(\d{1})(h)(\s)(\d{2})(m)/g, '$1' + '0' + '$2' + '$5' );

        timeint = timeint.replace( 'h', '' );

        //console.log( timeint );

        //console.log( '-----' );
        myArray.push ( { name:time, time:timeint } );

    }
    myArray.sort(function(a, b){return a.time - b.time});
    console.log(myArray);
    //console.log(rows);

    var newHtml = '';

    for( var key in myArray ) {
        if ( myArray.hasOwnProperty( key ) ) {

            // going through the rows
            for ( var j = 0; j < rows.length; j++ ) {
                var row = rows[j].innerHTML;
                // Not that row, then skip
                if ( row.search( myArray[key].name ) == -1 ) {
                    continue;
                }
                else {
                    newHtml = '<tr>' + row + '</tr>' + newHtml;
                }
            } // for

        } // if
    } // for

    console.log(newHtml);

    document.getElementById('the-list').innerHTML = newHtml;

})();
