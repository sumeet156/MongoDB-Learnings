   MongoDB CRUD Operations in Node.js
     
            Lesson 01: Working with MongoDB Documents in Node.js

                    -  BSON: Optimized for storage, retrieval, and transmission across the wire. More secure than plain text JSON
                             Supports More data types than JSON.
                             BSON-encoded documents are converted automatically by the driver. This means that you can use the data immediately in your application as 
                                  normal JSON and access properties by using dot notation. The driver handles the conversion from BSON to JSON for you.
                     
                      ~ Documents are the foundational organizing principle of storing data in MongoDB because they provide flexible and concise data representation.
                        Use Correct data types for field values : docs- 


            Lesson 02: Inserting a Document in Node.js Applications

 - insertOne() :To insert a single document into a collection, append insertOne() to the collection variable. The insertOne() method accepts a document as an argument and returns a promise. In this example, the document that's 
                being inserted is stored in a variable called sampleAccount, which is declared just above the main() function.
Ex. 
const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

const sampleAccount = {
 account_holder: "Linus Torvalds",
 account_id: "MDB829001337",
 account_type: "checking",
 balance: 50352434,
}

const main = async () => {
 try {
   await connectToDatabase()
   // insertOne method is used here to insert the sampleAccount document
   let result = await accountsCollection.insertOne(sampleAccount)
   console.log(`Inserted document: ${result.insertedId}`)
 } catch (err) {
   console.error(`Error inserting document: ${err}`)
 } finally {
   await client.close()
 }
}
 
main()
      
     - insertMany() :To insert more than one document, append the insertMany() method to the collection object, and then pass an array of documents to the insertMany() method. The insertMany() method returns a promise. We await the promise to get the result of the operation, which we then use to log the number of documents that are inserted to the console. In this example, the accounts to be inserted are stored in an array variable called sampleAccounts.
                     This variable is defined just above the main() function.
ex. 
const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

const sampleAccounts = [
 {
   account_id: "MDB011235813",
   account_holder: "Ada Lovelace",
   account_type: "checking",
   balance: 60218,
 },
 {
   account_id: "MDB829000001",
   account_holder: "Muhammad ibn Musa al-Khwarizmi",
   account_type: "savings",
   balance: 267914296,
 },
]
 
const main = async () => {
 try {
   await connectToDatabase()
   let result = await accountsCollection.insertMany(sampleAccounts)
   console.log(`Inserted ${result.insertedCount} documents`)
   console.log(result)
 } catch (err) {
   console.error(`Error inserting documents: ${err}`)
 } finally {
   await client.close()
 }
}

main()



            Lesson 03: Querying a MongoDB Collection in Node.js Applications

- find(): The find() method is a read operation that returns a cursor to the documents that match the query. The find() method takes a query or filter document as an argument. If you do not specify a query document, the find() method returns all documents in the collection.
In this example, we find all accounts that have a balance greater than or equal to 4700. The find() method accepts a query filter, which we assign to a variable called documentsToFind. 
We process each document that’s returned from the find() method by iterating the cursor, which is assigned to the variable result.

Ex.
const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

// Document used as a filter for the find() method
const documentsToFind = { balance: { $gt: 4700 } }
 
const main = async () => {
 try {
   await connectToDatabase()
   // find() method is used here to find documents that match the filter
   let result = accountsCollection.find(documentsToFind)
   let docCount = accountsCollection.countDocuments(documentsToFind)
   await result.forEach((doc) => console.log(doc))
   console.log(`Found ${await docCount} documents`)
 } catch (err) {
   console.error(`Error finding documents: ${err}`)
 } finally {
   await client.close()
 }
}

main()



- findOne() :we return a single document from a query, which is assigned to a variable called documentToFind. We use the findOne() method on the collection object to return the first document that matches the filter criteria, which are defined in the documentToFind variable.
Ex.
const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

// Document used as a filter for the findOne() method
const documentToFind = { _id: ObjectId("62a3638521a9ad028fdf77a3") }

const main = async () => {
 try {
   await connectToDatabase()
   // findOne() method is used here to find a the first document that matches the filter
   let result = await accountsCollection.findOne(documentToFind)
   console.log(`Found one document`)
   console.log(result)
 } catch (err) {
   console.error(`Error finding document: ${err}`)
 } finally {
   await client.close()
 }
}

main()




            Lesson 04: Updating Documents in Node.js Applications
-updateOne() : we use the updateOne() to update the value of an existing field in a document. Append the updateOne() method to the collection object to update a single document that matches the filter criteria, which are stored in the documentToUpdate variable. The update document contains the changes to be made and is stored in the update variable.
ex:
const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentToUpdate = { _id: ObjectId("62d6e04ecab6d8e130497482") }

const update = { $inc: { balance: 100 } }


const main = async () => {
  try {
    await connectToDatabase()
    let result = await accountsCollection.updateOne(documentToUpdate, update)
    result.modifiedCount === 1
      ? console.log("Updated one document")
      : console.log("No documents updated")
  } catch (err) {
    console.error(`Error updating document: ${err}`)
  } finally {
    await client.close()
  }
}

main()


-updateMany(): we update many documents by adding a value to the transfers_complete array of all checking account documents. The updateMany() method is appended to the collection object. The method accepts a filter that matches the document(s) that we want to update and an update statement that instructs the driver how to change the matching document. 
               Both the filter and the update documents are stored in variables. The updateMany() method updates all the documents in the collection that match the filter
ex:
const database = client.db(dbname);
const bank = database.collection(collection_name);

const documentsToUpdate = { account_type: "checking" };

const update = { $push: { transfers_complete: "TR413308000" } }

const main = async () => {
  try {
    await connectToDatabase()
    let result = await accountsCollection.updateMany(documentsToUpdate, update)
    result.modifiedCount > 0
      ? console.log(`Updated ${result.modifiedCount} documents`)
      : console.log("No documents updated")
  } catch (err) {
    console.error(`Error updating documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()



            Lesson 05: Deleting Documents in Node.js Applications

- deleteOne() : To delete a single document from a collection, use the deleteOne() method on a collection object. This method accepts a query filter that matches the document that you want to delete. If you do not specify a filter, MongoDB matches and deletes the first document in the collection
ex. 
const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentToDelete = { _id: ObjectId("62d6e04ecab6d8e13049749c") }

const main = async () => {
  try {
    await connectToDatabase()
    let result = await accountsCollection.deleteOne(documentToDelete)
    result.deletedCount === 1
      ? console.log("Deleted one document")
      : console.log("No documents deleted")
  } catch (err) {
    console.error(`Error deleting documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()


- deleteMany() : delete multiple documents from a collection in a single operation by calling the deleteMany() method on a collection object. To specify which documents to delete, pass a query filter that matches the documents that you want to delete. If you provide an empty document, MongoDB matches all documents in the collection and deletes them.
                 In the following example, we delete all accounts with a balance of less than 500 by using a query filter
ex.
const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentsToDelete = { balance: { $lt: 500 } }

const main = async () => {
 try {
   await connectToDatabase()
   let result = await accountsCollection.deleteMany(documentsToDelete)
   result.deletedCount > 0
     ? console.log(`Deleted ${result.deletedCount} documents`)
     : console.log("No documents deleted")
 } catch (err) {
   console.error(`Error deleting documents: ${err}`)
 } finally {
   await client.close()
 }
}
 
main()


            Lesson 06: Creating MongoDB Transactions in Node.js Applications

-Start a client session
-Define the transaction options (Optional)
-Define the sequence of operations to perform inside the transactions
-Release resources used by the transaction
- Multi-document transactions have a 60-second time limit
  
