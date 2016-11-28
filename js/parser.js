function getData() {

    var resultMap = new Map();

    var eventMap = new Map();
    var speechMap = new Map();
    var speakerMap = new Map();
    var partnerMap = new Map();

    var eventPartnerSet = new Set();

    loadData();

/*    console.log(eventMap.size);
    console.log(speechMap.size);
    console.log(speakerMap.size);
    console.log(partnerMap.size);*/

    dataBinding();



    return resultMap;

    function dataBinding() {
        speechMap.forEach(function (speech, speechId, speechmap) {
            speech.event = null;
            speech.partner = null;
            speech.speaker = null;
            resultMap.set(speechId, speech);
            var event = eventMap.get(parseInt(speech.eventId));
            // debug
            if(event == null) {console.log("Wrong event(id=" + speech.eventId + ") in speech " + speechId)}
            if(event.speechArr == null){
                event.speechArr = [];
            }
            event.speechArr.push(speech);
            speech.event = event;
            resultMap.set(event.id, event);

            var speaker = speakerMap.get(parseInt(speech.speakerId));
            if(speaker == null) {console.log("Wrong speaker(id=" + speech.speakerId + ") in speech " + speechId)}

            speech.speaker = speaker;
            resultMap.set(speaker.id, speaker);

            //event
            if(event.speakerArr == null){
                event.speakerArr = [];
            }
            event.speakerArr.push(speaker);
            //speaker
            if(speaker.eventArr == null){
                speaker.eventArr = [];
            }
            speaker.eventArr.push(event);

            if(speaker.speechArr == null){
                speaker.speechArr = [];
            }
            speaker.speechArr.push(speech);

            if(speech.partnerId != null) {
                var partner = partnerMap.get(parseInt(speech.partnerId));
                // debug
                if(partner == null) {console.log("Wrong partner(id=" + speech.partnerId + ") in speech " + speechId)}


                speech.partner = partner;
                resultMap.set(partner.id, partner);
                // partner
                if(partner.eventArr == null){
                    partner.eventArr = [];
                }
                partner.eventArr.push(event);
                if(partner.speechArr == null){
                    partner.speechArr = [];
                }
                partner.speechArr.push(speech);

                //event
                if(event.partnerArr == null){
                    event.partnerArr = [];
                }
                if(!eventPartnerSet.has(partner)){
                    event.partnerArr.push(partner);
                    eventPartnerSet.add(partner);
                }
                //speaker
                if(speaker.partnerArr == null){
                    speaker.partnerArr = [];
                }
                speaker.partnerArr.push(partner);
            }
        });
    }

    function loadData() {
        $.ajaxSetup({
            async: false
        });

        $.getJSON('../data/events.json', function (data) {
            data.forEach(function (entry) {
                eventMap.set(entry.id, entry);
            });
        });
        $.getJSON('../data/speakers.json', function (data) {
            data.forEach(function (entry) {
                speakerMap.set(entry.id, entry);
            });

        });
        $.getJSON('../data/speeches.json', function (data) {
            data.forEach(function (entry) {
                speechMap.set(entry.id, entry);
            });

        });
        $.getJSON('../data/partners.json', function (data) {
            data.forEach(function (entry) {
                partnerMap.set(entry.id, entry);
            });
        });

        $.ajaxSetup({
            async: true
        });
    }

}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}