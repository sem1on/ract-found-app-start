export default class PostService {
    static async getAll() {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            return res;
        } catch (e) {
            console.log(e);
        }
    }
}