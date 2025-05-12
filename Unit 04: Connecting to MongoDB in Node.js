   Connecting to MongoDB in Node.js
          
          Lesson 1: Using MongoDB Node.js Client Libraries
                    Driver: The driver works in tandem with the built-in Node.js BSON package to interact with your MongoDB server 
                    The official MongoDB driver establishes secure connections to a MongoDB cluster and executes database operations on behalf of client applications
                    MongoDB drivers establish secure connections to a MongoDB cluster and execute
                    database operations on behalf of client applications.
           
          Lesson 2: Connecting to an Atlas Cluster in Node.js Applications
                   - Install the official MongoDB Node.js driver: mkdir test
                                                                  cd test
                                                                  npm init -y
                                                                  Open VS Code - npm install mongodb -> Drivers intalled 

                   - Connect a MongoClient: login in Atlas -> click connect -> connect your application -> copy the connection string-> create a file atlas_url.js 
                                          -> enter code string with your password -> create app.js -> call mongoClient with code

                   - Instantiate a single MongoClient: An application should use a single MongoClient instance for all database requests
                                                       Creating MongoCIients is resource intensive
                                                       Creating a new MongoClient for each request will affect the application's performance
                               You need only one instance per Atlas cluster for your application. Having more than one *MongoClient" instance for a
                               single Atlas cluster in your application will increase costs and negatively impact the performance of your database.
          
          Lesson 3: Troubleshooting a MongoDB Connection in Node.js Applications - Connectivity issues are common when starting out
                                                                                   Connectivity issues may result from systems put in place to protect the database
                   - Network access errors: Fix a network access error by adding your IP address to the allowlist
                   - User authentication errors: Fix authentication errors caused by an incorrect password or user, Check that your password is populated and correct
          
          








