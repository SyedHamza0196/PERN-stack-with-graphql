const graphql = require('graphql');
const _ = require('lodash');
const Db = require('../db');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID, 
        GraphQLInt, 
        GraphQLList,
        GraphQLNonNull 
    } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(book){
                return book.getAuthor();
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(author){
                return author.getBooks();
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db / other source
                return Db.models.book.findByPk(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Db.models.author.findByPk(args.id);;
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Db.models.book.findAll();
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return Db.models.author.findAll();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(_,args){
                return Db.models.author.create({
                    name : args.name,
                    age : args.age
                });
            }
        },
        addBook: {
            type: BookType,
            args : {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(_,args){
                return Db.models.book.create({
                    name : args.name,
                    genre : args.genre,
                    authorId: args.authorId
                });
        }
    }
}
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});