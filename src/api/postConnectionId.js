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

    const response = await fetch('http://localhost:5000/api/connection-id/front', requestOptions);
    let jsonData = await response.json();
    return jsonData;
}
export default postConnectionId;
