const getLogsToEventToTopic = async (event_name, topico) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode: 'cors',
    };

    const response = await fetch(`https://eda-daii-production-9f47.up.railway.app/api/logs/topic/${topico}/event/${event_name}`, requestOptions);
     // Intentar parsear la respuesta como JSON
    const data = await response.json();
    return data;

}

export default getLogsToEventToTopic;