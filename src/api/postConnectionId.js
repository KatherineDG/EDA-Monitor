const postConnectionId = async (connectionId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "connection_id": connectionId,
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw, // Usar shorthand para objetos
        redirect: 'follow',
        mode: 'cors',
    };

    const response = await fetch('http://ec2-54-90-250-142.compute-1.amazonaws.com:5000/api/connection-id/front', requestOptions);
    let jsonData = await response.json();
    return jsonData;
}
export default postConnectionId;
