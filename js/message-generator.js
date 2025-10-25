// Message generation logic
class MessageGenerator {
    generate(data) {
        const {
            speakerType,
            commandType,
            tailNumber,
            runwayNumber,
            location,
            altitude,
            atisInfo,
            frequency,
            notes,
            atcName
        } = data;

        if (speakerType === 'Pilot') {
            return this.generatePilotMessage(commandType, tailNumber, runwayNumber, location, altitude, atisInfo, frequency, notes, atcName);
        } else {
            return this.generateATCMessage(commandType, tailNumber, runwayNumber, location, altitude, atisInfo, frequency, notes, atcName);
        }
    }

    generatePilotMessage(commandType, tailNumber, runwayNumber, location, altitude, atisInfo, frequency, notes, atcName) {
        const atc = atcName || this.getDefaultATC(commandType);

        switch (commandType) {
            case 'Initial Contact':
                return `${atc} Tower, ${tailNumber}, ${location ? location + ', ' : ''}request transition through Class Bravo airspace${altitude ? ' at ' + altitude + ' feet' : ''}.`;
            case 'Request to Enter Airspace':
                return `${atc} Approach, ${tailNumber}, ${location ? location + ' at ' + altitude + ' feet, ' : ''}${atisInfo ? 'with information ' + atisInfo + ', ' : ''}request clearance into Class Bravo airspace.`;
            case 'Takeoff Request':
                return `${atc} Tower, ${tailNumber}, at runway ${runwayNumber || '27'}, ready for takeoff${notes ? ', ' + notes : ''}.`;
            case 'Landing Request':
                return `${atc} Tower, ${tailNumber}, ${location ? location + ' at ' + altitude + ' feet, ' : ''}${atisInfo ? 'with information ' + atisInfo + ', ' : ''}request landing.`;
            case 'Position Report':
                return `${tailNumber}, ${location ? 'over ' + location : ''}${altitude ? ', ' + altitude + ' feet' : ''}, transitioning Class Charlie airspace.`;
            case 'VFR Transition':
                return `${atc} Approach, ${tailNumber}, ${location ? location + ' at ' + altitude + ' feet, ' : ''}request VFR transition through Class Bravo airspace${notes ? ' ' + notes : ''}.`;
            case 'Altitude Change Request':
                return `${atc} Approach, ${tailNumber}, request climb to ${altitude || '7,500'} feet.`;
            case 'Leaving Airspace':
                return `${tailNumber}, clear of Class Bravo airspace${notes ? ', ' + notes : ''}.`;
            case 'Frequency Change':
                return `${tailNumber}, request frequency change to monitor CTAF ${frequency || '122.8'}.`;
            case 'Uncontrolled Airport Report':
                return `Podunk Traffic, ${tailNumber}, ${location ? location + ', ' : ''}entering left downwind for runway ${runwayNumber || '18'}, Podunk.`;
            case 'Emergency Declaration':
                return `Mayday, Mayday, Mayday, ${tailNumber}, ${notes || 'engine failure'}, ${location ? location + ' at ' + altitude + ' feet, ' : ''}request immediate landing at nearest airport.`;
            case 'Maneuver Request':
                return `${tailNumber}, request right 360-degree turn for spacing.`;
            case 'Traffic Report':
                return `${tailNumber}, traffic in sight${notes ? ', ' + notes : ''}.`;
            default:
                return 'Invalid command type selected.';
        }
    }

    generateATCMessage(commandType, tailNumber, runwayNumber, location, altitude, atisInfo, frequency, notes, atcName) {
        const atc = atcName || 'Tower';

        switch (commandType) {
            case 'Initial Contact Response':
                return `${tailNumber}, ${atc}, squawk 1234${altitude ? ', maintain ' + altitude + ' feet' : ''}, cleared to transit Class Bravo airspace.`;
            case 'Request to Enter Airspace Response':
                return `${tailNumber}, ${atc}, cleared into Class Bravo airspace${altitude ? ', maintain VFR at ' + altitude + ' feet' : ''}${location ? ', report reaching ' + location : ''}.`;
            case 'Takeoff Request Response':
                return `${tailNumber}, ${atc}, cleared for takeoff runway ${runwayNumber || '27'}, right turn approved${frequency ? ', contact departure on ' + frequency : ''}.`;
            case 'Landing Request Response':
                return `${tailNumber}, ${atc}, enter left downwind for runway ${runwayNumber || '9'}, report downwind.`;
            case 'Emergency Declaration Response':
                return `${tailNumber}, ${atc}, roger your Mayday, cleared to land any runway at nearest airport${location ? ', ' + location : ''}, emergency services alerted.`;
            case 'Maneuver Request Response':
                return `${tailNumber}, ${atc}, approved for right 360, report completion.`;
            case 'Traffic Report Response':
                return `${tailNumber}, ${atc}, roger, number two for landing, follow the traffic, cleared to land runway ${runwayNumber || '22'}.`;
            default:
                return 'Invalid command type selected.';
        }
    }

    getDefaultATC(commandType) {
        const defaults = {
            'Initial Contact': 'Los Angeles',
            'Request to Enter Airspace': 'Seattle',
            'Takeoff Request': 'Chicago',
            'Landing Request': 'Miami',
            'VFR Transition': 'Atlanta',
            'Altitude Change Request': 'Boston'
        };
        return defaults[commandType] || 'Tower';
    }
}