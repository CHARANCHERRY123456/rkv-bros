const envVars = Object.keys(import.meta.env)
    .filter((key)=>key.startsWith("VITE_"))
    .reduce((acc , key)=>{
        acc[key] = import.meta.env[key];
        return acc
    } , {});

export default envVars;