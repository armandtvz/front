// Yes, this goes against Handlebars
'use strict';
if (Handlebars) {
    /*
    TODO:
    - timesince
    - timeuntil
    - intcomma
    - floatformat
    - default
    - timezone handling
    - custom datetime formats in hash.options
    - time
    - truncatechars
    - truncatewords
    - title
    - length
    - linebreaks

    */


    // Boolean helpers

    Handlebars.registerHelper('YesNo', (b) => {
        // {{YesNo user.active}}
        if (b) {
            return 'Yes';
        }
        return 'No';
    });

    Handlebars.registerHelper('yesno', (b) => {
        // {{yesno user.active}}
        if (b) {
            return 'yes';
        }
        return 'no';
    });




    // String helpers

    Handlebars.registerHelper('capfirst', (value) => {
        value = front_utils.capfirst(value);
        return value;
    });

    Handlebars.registerHelper('lower', (value) => {
        value = value.toLowerCase();
        return value;
    });

    Handlebars.registerHelper('upper', (value) => {
        value = value.toUpperCase();
        return value;
    });

    Handlebars.registerHelper('linebreaksbr', (value) => {
        value = value.replace(/(?:\r\n|\r|\n)/g, '<br>');
        value = new Handlebars.SafeString(value);
        return value;
    });




    // Datetime helpers

    Handlebars.registerHelper('datetime', function(datetime) {
        return front_utils.format_datetime(datetime);
    });

    Handlebars.registerHelper('datetimebr', function(datetime) {
        const date = front_utils.format_date(datetime);
        const time = front_utils.format_time(datetime);
        return new Handlebars.SafeString(`${date} <br> ${time}`);
    });

    Handlebars.registerHelper('date', function(date) {
        return front_utils.format_date(date);
    });

} else {
    logger.info('Handlebars is not defined; cannot register helpers.');
}
