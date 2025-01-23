const dbName = "CostManagerDB";
const storeName = "costItems";
const dbVersion = 1;
let globalDB = null;

export const initializeDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                const store = db.createObjectStore(storeName, {
                    keyPath: "id",
                    autoIncrement: true,
                });
                store.createIndex("date", "date", { unique: false });
                store.createIndex("category", "category", { unique: false });
            }
        };

        request.onsuccess = (event) => {
            globalDB = event.target.result;
            resolve(globalDB);
        };

        request.onerror = (event) => {
            console.error("Database initialization error:", event.target.error);
            reject(event.target.error);
        };
    });
};

const getTransaction = (mode = "readwrite") => {
    if (!globalDB) {
        throw new Error("Database not initialized");
    }
    return globalDB.transaction([storeName], mode);
};

export const addCostItem = (costItem) => {
    return new Promise((resolve, reject) => {
        try {
            const transaction = getTransaction();
            const store = transaction.objectStore(storeName);
            store.add({
                ...costItem,
                timestamp: Date.now()
            });
            transaction.oncomplete = () => resolve();
            transaction.onerror = (event) => reject(event.target.error);
        } catch (error) {
            console.error("Add cost item error:", error);
            reject(error);
        }
    });
};

export const getMonthlyReport = (month, year) => {
    return new Promise((resolve, reject) => {
        try {
            const transaction = getTransaction();
            const store = transaction.objectStore(storeName);
            const items = [];

            const cursorRequest = store.openCursor();

            cursorRequest.onsuccess = (event) => {
                const cursor = event.target.result;

                if (cursor) {
                    const item = cursor.value;
                    const itemDate = new Date(item.date);

                    if (
                        itemDate.getMonth() + 1 === parseInt(month, 10) &&
                        itemDate.getFullYear() === parseInt(year, 10)
                    ) {
                        items.push(item);
                    }

                    cursor.continue();
                } else {
                    resolve(items);
                }
            };

            cursorRequest.onerror = (event) => reject(event.target.error);
        } catch (error) {
            reject(error);
        }
    });
};