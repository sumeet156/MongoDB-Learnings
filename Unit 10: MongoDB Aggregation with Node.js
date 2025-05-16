 MongoDB Aggregation with Node.js

     Lesson 01: Building a MongoDB Aggregation Pipeline in Node.js Applications
              - An aggregation pipeline is composed of stages and expression operators         
              - Aggregation is a language for filtering, sorting, organizing, and analyzing data


     Lesson 02: Using MongoDB Aggregation Stages with Node.js: $match and $group
              - $match :  The $match stage filters documents by using a simple equality match, like $match: { author: "Dave"}, or aggregation expressions using comparison operators, like $match: { likes: { $gt: 100 } }.
                          This operator accepts a query document and passes the resulting documents to the next stage. $match should be placed early in your pipeline to reduce the number of documents to process.


              - $group :  The $group stage separates documents according to a group key and returns one document for every unique group key. The group key is usually a field in the document, but it can also be an expression that resolves to a field. 
                          The $group stage can be used with aggregation expressions to perform calculations on the grouped documents.

Ex.
const client = new MongoClient(uri)
const dbname = "bank";
const collection_name = "accounts";
const accountsCollection = client.db(dbname).collection(collection_name);

const pipeline = [
  // Stage 1: match the accounts with a balance less than $1,000
  { $match: { balance: { $lt: 1000 } } },
  // Stage 2: Calculate average balance and total balance
  {
    $group: {
      _id: "$account_type",
      total_balance: { $sum: "$balance" },
      avg_balance: { $avg: "$balance" },
    },
  },
]

const main = async () => {
  try {
    await client.connect()
    console.log(`Connected to the database 🌍. \nFull connection string: ${safeURI}`)
    let result = await accountsCollection.aggregate(pipeline)
    for await (const doc of result) {
      console.log(doc)
    }
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`)
  } finally {
    await client.close()
  }
}

main()




     Lesson 03: Using MongoDB Aggregation Stages with Node.js: $sort and $project
              - $match: 
              - $sort: The $sort stage takes all the input documents and sorts them in a specific order. The documents can be sorted in numerical, alphabetical, ascending, or descending order.
                   The $sort stage accepts a sort key that specifies the field to sort on. The sort key can be 1 for ascending order or -1 for descending order. For example:

                       •{ $sort: { balance: 1 } } sorts the documents in ascending order by the balance field.

                       • { $sort: { balance: -1 } } sorts the documents in descending order by the balance field.


              - $project: The $project stage takes all the input documents and passes along only a subset of the fields in those documents by specifying the fields to include or exclude.

                         For example, if we want our resulting documents to include only the account_id, we write { $project: { _id: 0, account_id: 1 } }. The _id field is excluded by setting it to 0, and the account_id field is included by setting it to 1.
                      
ex.

const pipeline = [
  // Stage 1: $match - filter the documents (checking, balance >= 1500)
  { $match: { account_type: "checking", balance: { $gte: 1500 } } },

  // Stage 2: $sort - sorts the documents in descending order (balance)
  { $sort: { balance: -1 } },

  // Stage 3: $project - project only the requested fields and one computed field (account_type, account_id, balance, gbp_balance)
  {
    $project: {
      _id: 0,
      account_id: 1,
      account_type: 1,
      balance: 1,
      // GBP stands for Great British Pound
      gbp_balance: { $divide: ["$balance", 1.3] },
    },
  },
]



const main = async () => {
  try {
    await client.connect()
    console.log(`Connected to the database 🌍\n ${uri}`)
    let accounts = client.db("bank").collection("accounts")
    let result = await accounts.aggregate(pipeline)
    for await (const doc of result) {
      console.log(doc)
    }
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`)
  } finally {
    await client.close()
  }
}

main()







