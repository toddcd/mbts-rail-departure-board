import config from "../config";

const MbtaAPIService = {
    getNorthSouthStationDepartures() {
        console.log('Get South Station Departure Data');
        return fetch(`${config.MBTA_API_ENDPOINT}/predictions?sort=-departure_time&filter[stop]=South Station,North Station&include=vehicle,trip`,
            {
                headers: {
                    'x-api-key': `${config.MBTA_API_KEY}`,
                },
            }).then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    }
}

export default MbtaAPIService;