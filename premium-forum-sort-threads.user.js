// ==UserScript==
// @name         Premium Forum Extras - Sort it!
// @namespace    https://theeventscalendar.com/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @include      https://theeventscalendar.com/wp-admin/edit.php?post_type=topic&page=tribe-support-queues*
// @exclude      https://theeventscalendar.com/wp-admin/edit.php?post_type=topic&page=tribe-support-queues&saved_filter=1343915*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Enable logging?
    var log = 0;
    var myArray = [];

    if ( log == 1 ) console.log( 'start' );

    // Get the times
    var times = document.getElementsByClassName( 'column-activity' );

    // Add a class to the rows, so we can get them in an array / object
    jQuery( '#the-list' ).children().addClass( 'the-list-row' );
    var rows = document.getElementsByClassName( 'the-list-row' );

    for ( var i = 0; i < times.length ; i++ ) {

        var time = times[i].innerHTML;
        var timeint;

        // Skip Week, Month, first and last row
        // Likely noone will have a week old thread
        // If you do, shame on you ;)
        if ( time.search( 'W' ) >= 0 || time.search( 'M' ) >= 0 || time.search( 'Activity' ) >= 0 ) {
            continue;
        }
        if ( log == 1 ) console.log( time );

        // Check for D(ay)
        if ( time.search( /(\d)(D)(\s{0,})/g ) >= 0 ) {
            timeint = time.replace( /(\d)(D)(\s{0,})/g, '$1.' );
        }
        // If not older than a day, add 0.
        else {
            timeint = '0.' + time;
        }

        if ( log == 1 ) console.log( timeint );

        // Replacing double digit hours and single digit minutes
        timeint = timeint.replace( /(\d{2})(h)(\s)(\d{1})(m)/g, '$1' + '0' + '$4' );

        if ( log == 1 ) console.log( timeint );

        // Replacing double digit hours and double digit minutes
        timeint = timeint.replace( /(\d{2})(h)(\s)(\d{2})(m)/g, '$1' + '$4' );

        if ( log == 1 ) console.log( timeint );

        // Replacing single digit hours and single digit minutes
        timeint = timeint.replace( /(\.)(\d{1})(h)(\s)(\d{1})(m)/g, '$1' + '0' + '$2' + '0' + '$5' );

        // Replacing single digit hours and double digit minutes
        timeint = timeint.replace( /(\.)(\d{1})(h)(\s)(\d{2})(m)/g, '$1' + '0' + '$2' + '$5' );

        // Removing the remainder 'h'
        timeint = timeint.replace( 'h', '' );

        if ( log == 1 ) console.log( timeint );

        if ( log == 1 ) console.log( '-----' );

        // Creating the array of time string and time integer for comparison
        myArray.push ( { name:time, time:timeint } );

    }

    // Sort the array descending based on time integer
    myArray.sort(function(a, b){return a.time - b.time});

    if ( log == 1 ) console.log( myArray );
    //console.log(rows);

    var newHtml = '';

    // Go through the time array
    for( var key in myArray ) {
        if ( myArray.hasOwnProperty( key ) ) {

            // For each time entry go through the rows
            for ( var j = 0; j < rows.length; j++ ) {

                var row = rows[j].innerHTML;

                // Not that row, then skip
                if ( row.search( myArray[key].name ) == -1 ) {
                    continue;
                }
                // If it's that row, but it in the front
                else {
                    newHtml = '<tr>' + row + '</tr>' + newHtml;
                }
            } // for

        } // if
    } // for

    if ( log == 1 ) console.log(newHtml);

    // Replace the thread list
    document.getElementById('the-list').innerHTML = newHtml;

})();
