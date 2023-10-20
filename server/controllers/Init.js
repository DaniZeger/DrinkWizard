const BarModel = require('../models/Bars')
const CocktailModel = require('../models/Cocktails')
const PostModel = require('../models/Post')
const UserModel = require('../models/User');
const BarsList = require('../data/bars')
const CocktailsList = require('../data/cocktails')
const PostsLIst = require('../data/posts')
const UsersList = require('../data/users')

module.exports = {
    init: async function (req, res, next) {
        await BarModel.collection.drop()
        await CocktailModel.collection.drop()
        await PostModel.collection.drop()
        await UserModel.collection.drop()

        try {
            const bars = BarsList
            const cocktails = CocktailsList
            const posts = PostsLIst
            const users = UsersList

            await BarModel.insertMany(bars)
            await CocktailModel.insertMany(cocktails)
            await PostModel.insertMany(posts)
            await UserModel.insertMany(users)

        } catch (err) {
            console.error(err);
        }
    }
}