const generateKey = (indentifier, query = "") => {
    return `${indentifier}_${query.replace(/ /g,"_")}`;
}

const setItemWithExpirationTime = (key, data, ttlInMinutes = 7200) => {
    
    const item = {
        data,
        expiration: new Date().getTime() + ttlInMinutes * 60000
    }
    
    localStorage.setItem(key, JSON.stringify(item));
    console.info(`[Info]: Data has been stored in localStorage ::: ${key}`);
}

const getItemWithExpirationTime = (key) => {
    const rawItem = localStorage.getItem(key);
    
    if(!rawItem) return null;

    const { expiration, data } = JSON.parse(rawItem);

    if (new Date().getTime() > expiration) {
		localStorage.removeItem(key);
		return null;
	}

    console.info(`[Info]: Data has been retrieved from localStorage ::: ${key}`);
    return data;
}

export {
    generateKey,
    setItemWithExpirationTime,
    getItemWithExpirationTime
}
