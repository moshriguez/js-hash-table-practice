// Hash Tables are a data structure that allow you to create a list of paired values. You can then retrieve a certain value by using the key for that value, which you put into the table beforehand.
// A Hash Table transforms a key into an integer index using a hash function, and the index will decide where to store the key/value pair in memory

// There are multiple ways to create a hash table in JavaScript
// The most common are the built in Object or Map classes

// Hash Table using a JavaScript Object:

let obj = {
    Nathan: '555-0182',
    Jane: '315-0322'
}

// a JS object is a special kind of hash table. It has properties inherited from the Object prototype, which can conflict with keys you enter and you can potentially overwrite these properties. Also the size of the Hash Table is not stored. 
// A Map overcomes these shortcomings:

// Hash Table using a JavaScript Map:

const collection = new Map()

collection.set('Nathan', '555-0182')
collection.set('Jane', '315-0322')

console.log(collection.get('Nathan'))
console.log(collection.size)

// Map uses get() and set() to define and retrieve values

// You can also create your own hash table from scratch:

class HashTable {
    constructor() {
        // this table will have 127 'buckets' to store info
        this.table = new Array(127)
        this.size = 0
    }

    _hash(key) {
        // not a perfect hashing method as there will be multiple combos of chars that result in the same hash - fixed by modifying the set(), get() & remove() methods
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        return hash % this.table.length
    }

    set(key, value) {
        const index = this._hash(key)
        if (this.table[index]) {
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i][0] === key) {
                    this.table[index][i][1] = value
                    return
                }
            }
            this.table[index].push([key, value])
        } else {
            this.table[index] = []
            this.table[index].push([key, value])
        }
        this.size++
    }

    get(key) {
        const index = this._hash(key) 
        if (this.table[index]) {
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i][0] === key) {
                    return this.table[index][i][1]
                }
            }
        }
        return undefined
    }

    remove(key) {
        const index = this._hash(key) 
        if (this.table[index] && this.table[index].length) {
            for (let i = 0; i < this.table[index].length; i++) {
                if (this.table[index][i][0] === key) {
                    this.table.splice(i, 1)
                    this.size--
                    return true
                }
            }
        } else {
            return false
        }
    }

    display() {
        this.table.forEach((values, index) => {
            const chainedValues = values.map(([key, value]) => `[ ${key}: ${value} ]`)
            console.log(`${index}: ${chainedValues}`)
        })
    }
}

