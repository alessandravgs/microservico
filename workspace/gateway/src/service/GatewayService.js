import axios from 'axios';

const getServiceUrls = async (serviceName) =>{
    try{
        const url = `${process.env.SERVICE_REGISTRY_URL}/services/${serviceName}`;
        const response = await axios.get(url);
        return response.data.urls;
    }catch(error){
        console.error(`Error fetching service URLs: ${serviceName}: ${error.message}`);
        return [];
    }
}

const getNextServiceUrl = (serviceName, servicesInstances, roudRobinIndex) => {
    if(!servicesInstances[serviceName] || servicesInstances[serviceName].length === 0)
        return null;

    const urls = servicesInstances[serviceName];
    roudRobinIndex[serviceName] = (roudRobinIndex[serviceName] + 1) % urls.length;
    return urls[roudRobinIndex[serviceName]];
}


export { getServiceUrls,  getNextServiceUrl};
