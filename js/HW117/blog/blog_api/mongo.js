import Mongo from 'mongodb';
const uri = 'mongodb://127.0.0.1:27017';
const client = new Mongo.MongoClient(uri);

await client.connect();
export let posts = await client.db('blog').collection('posts');
export let users = await client.db('blog').collection('users');
