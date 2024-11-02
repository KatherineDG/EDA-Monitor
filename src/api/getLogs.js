const getLogs = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode: 'cors',
    };

    const response = await fetch(`http://ec2-54-90-250-142.compute-1.amazonaws.com:5000/api/logs`, requestOptions);
     // Intentar parsear la respuesta como JSON
    const data = await response.json();
    return data;
}

export default getLogs;