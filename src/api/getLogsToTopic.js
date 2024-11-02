const getLogsToTopic = async (topico) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode: 'cors',
    };

    const response = await fetch(`http://ec2-34-235-212-207.compute-1.amazonaws.com:5000/api/logs/topic/${topico}`, requestOptions);
     // Intentar parsear la respuesta como JSON
    const data = await response.json();
    return data;

}

export default getLogsToTopic;