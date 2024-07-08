import { createProxyMiddleware } from 'http-proxy-middleware';
import { getServiceUrls,  getNextServiceUrl} from "../service/GatewayService.js";

const servicesInstances = {};
const roundRobinIndex = {};

const proxyMiddleware = async (req, res, next) => {
    const { serviceName } = req.params;

    if (!servicesInstances[serviceName] || servicesInstances[serviceName].length === 0) {
        const urls = await getServiceUrls(serviceName);

        if (urls.length > 0) {
            servicesInstances[serviceName] = urls;
            roundRobinIndex[serviceName] = 0;
        } else {
            return res.status(404).json({ message: `Serviço não encontrado ${serviceName}` });
        }
    }

    const serviceUrl = getNextServiceUrl(serviceName, servicesInstances, roundRobinIndex);
    console.log(`Proxying to: ${serviceUrl}`);

    if (serviceUrl) {
        const endpoint = req.originalUrl.replace(`/${serviceName}/`, '');

        createProxyMiddleware({
            target: `${serviceUrl}/${endpoint}`,
            changeOrigin: true,
            onProxyReq: (proxyReq, req) => {
                const token = req.headers.authorization;

                if (token) {
                    proxyReq.setHeader('Authorization', token);
                }

                if (req.body) {
                    const bodyData = JSON.stringify(req.body);
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                    proxyReq.write(bodyData);
                }
            }
        })(req, res, next);
    } else {
        return res.status(404).json({ message: `Serviço não encontrado ${serviceName}` });
    }
};

export { proxyMiddleware };
