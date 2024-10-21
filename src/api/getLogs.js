const getLogs = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode: 'cors',
    };

    const response = await fetch(`http://localhost:3030/api/logs`, requestOptions);
     // Intentar parsear la respuesta como JSON
    const data = await response.json();
    return data;

}

export default getLogs;