const list = [
    { pid: null, id: 1, data: '1' },
    { pid: 1, id: 2, data: '2-1' },
    { pid: 1, id: 3, data: '2-2' },
    { pid: 2, id: 4, data: '3-1' },
    { pid: 3, id: 5, data: '3-2' },
    { pid: 4, id: 6, data: '4-1' }
]

function listToTree(list, rootId = null, { idName = "id", pidName = "pid", childName = "children" } = {}) {
    const root = []
    const record = {} // id -> children

    for (const item of list) {
        const newItem = { ...item }
        const id = newItem[idName]
        const parentId = newItem[pidName]

        newItem[childName] = record[id] ? record[id] : (record[id] = [])
        
        if (parentId === rootId) {
            root.push(newItem)
        } else {
            record[parentId] = record[parentId] || []
            record[parentId].push(newItem)
        }
    }

    return root
}

const tree = listToTree(list)
console.log(tree)
