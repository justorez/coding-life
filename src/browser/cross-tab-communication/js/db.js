const STORE_NAME = 'ctc_justorez'
const INDEXDB_TAG = 'ctc_data'
export function openStore() {
    return new Promise(function (resolve, reject) {
        if (!window.indexedDB) {
            reject("don't support indexedDB")
            return
        }

        const request = indexedDB.open('CTC_DB', 1)
        request.onupgradeneeded = function (e) {
            console.log('upgrade db')
            const db = e.target.result
            if (e.oldVersion === 0) {
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, {
                        keyPath: 'tag'
                    })
                    store.createIndex(STORE_NAME + 'Index', 'tag', {
                        unique: false
                    })
                    console.log('create index successfully')
                }
            }
        }
        request.onsuccess = function (e) {
            console.log('connect successfully')
            const db = e.target.result
            resolve(db)
        }
        request.onerror = function (e) {
            console.error('connect failed')
            reject(e)
        }
    })
}

export function saveData(db, data) {
    return new Promise(function (resolve, reject) {
        const tx = db.transaction(STORE_NAME, 'readwrite')
        const store = tx.objectStore(STORE_NAME)
        const request = store.put({
            tag: INDEXDB_TAG,
            data
        })
        request.onsuccess = () => resolve(db)
        request.onerror = function (e) {
            console.error('save failed', e)
            reject(e)
        }
    })
}

export function query(db) {
    return new Promise(function (resolve, reject) {
        try {
            const tx = db.transaction(STORE_NAME, 'readonly')
            const store = tx.objectStore(STORE_NAME)
            const dbRequest = store.get(INDEXDB_TAG)
            dbRequest.onsuccess = (e) => resolve(e.target.result)
            dbRequest.onerror = (err) => reject(err)
        } catch (err) {
            reject(err)
        }
    })
}
