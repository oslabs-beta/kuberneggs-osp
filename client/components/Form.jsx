import React, { useState } from "react";

const Form = () => {
    const [deploymentName, setDeploymentName] = useState('');
    const [numReplicas, setNumReplicas] = useState(0);
    const [clusterLabel, setClusterLabel] = useState('');
    const [dockerImage, setDockerImage] = useState('');
    const [containerPort, setContainerPort] = useState(0);

    const handleInputChange = (e, setter, isNum = false) => {
        if (isNum) {
            setter(parseInt(e.target.value));
            console.log(typeof e.target.value);
        } else {
        setter(e.target.value);
        console.log(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const yamlObj = {
            clusterName: deploymentName,
            replicas: numReplicas,
            image: dockerImage,
            port: containerPort,
            label: clusterLabel
        };
        console.log(yamlObj);

        try {

            const postYaml = await fetch('/api/yaml', {
                method: "POST",
                mode: "cors",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(yamlObj)
            });

            const jsonRes = await postYaml.json();
            console.log(jsonRes);
        } catch(err) {
            console.log(`ERROR : ${err}`);
        }

    };


    return (
        <form id="minikube-form">

            <br />
            <label htmlFor="deploymentName">Deployment name:</label>
            <input type="text" id="deploymentName" onChange={(e) => handleInputChange(e, setDeploymentName)} />
            <p className="info">Each Deployment resource requires a unique Deployment Name. Kubernetes resources are identified by their names.</p>
 
            <label htmlFor="numReplicas">Number of replicas:</label>
            <input type="number" id="numReplicas" onChange={(e) => handleInputChange(e, setNumReplicas, true)} />
            <p className="info">The desired number of Pod resources is set in the Replicas field.</p>

            <label htmlFor="clusterLabel">Cluster label:</label>
            <input type="text" id="clusterLabel" onChange={(e) => handleInputChange(e, setClusterLabel)} />
            <p className="info">Labels are custom key/value pairs that are assigned to Kubernetes resources.</p>
            

            <label htmlFor="dockerImage">Docker Image:</label>
            <input type="text" id="dockerImage" onChange={(e) => handleInputChange(e, setDockerImage)} />
            <p>Optional: reference a container image from a Docker feed. </p>
            

            <label htmlFor="containerPort">Port Number:</label>
            <input type="number" id="containerPort" onChange={(e) => handleInputChange(e, setContainerPort, true)} />
            <p>The Port number is required and must be a number between 1 and 65535.</p>
    

            <button id="btnMinikube" onClick={(e) => {handleSubmit(e)}}>Deploy</button>

        </form>
    )
}

export default Form;