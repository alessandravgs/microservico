import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getServiceFilePath = () => {
    return path.join(__dirname, '..', 'public', 'services.json');
};

const ensureServiceFileExists = () => {
    const filePath = getServiceFilePath();
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) 
        fs.mkdirSync(dirPath, { recursive: true });
    
    if (!fs.existsSync(filePath)) 
        fs.writeFileSync(filePath, JSON.stringify({}), 'utf8');
    
};

const clearServiceFile = () => {
    const filePath = getServiceFilePath();
    fs.writeFileSync(filePath, JSON.stringify({}), 'utf8');
};

const readServicesFromFile = () => {
    const filePath = getServiceFilePath();
    
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    }
    return {};
};

const saveServicesToFile = (services) => {
    const filePath = getServiceFilePath();
    fs.writeFileSync(filePath, JSON.stringify(services, null, 2), 'utf8');
};

export { ensureServiceFileExists, clearServiceFile, readServicesFromFile, saveServicesToFile };
