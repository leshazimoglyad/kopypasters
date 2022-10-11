// Save to storage
const saveToStorage = (key, value) => {
        try {
                const serializedState = JSON.stringify(value);
                localStorage.setItem(key, serializedState);
        } catch (error) {
                console.error("Set state error: ", error.message);
        }
};

// Load from storage
const loadFromStorage = (key) => {
        try {
                const serializedState = localStorage.getItem(key);
                return serializedState === null ? undefined : JSON.parse(serializedState);
        } catch (error) {
                console.error("Get state error: ", error.message);
        }
};

// Remove item from storage
const removeFromStorage = (key) => {
        try {
                localStorage.removeItem(key);
        } catch (error) {
                console.error("Get state error: ", error.message);
        }
};

// Append key
function appendToStorage(key, data) {
        try {
                const newData = loadFromStorage(key);
                if (newData === null) newData = [];
                newData.push(data);
                saveToStorage(key, newData);
        } catch (error) {
                console.error("Get state error: ", error.message);
        }
}

// Remove key from storage
function removeKeyFromStorage(key, index) {
        try {
                const newData = loadFromStorage(key);
                if (newData === null) throw(error);                
                newData.splice(index, 1);
                saveToStorage(key, newData);
        } catch (error) {
                console.error("Get state error: ", error.message);
        }
}

export { saveToStorage, loadFromStorage, removeFromStorage, appendToStorage, removeKeyFromStorage };
