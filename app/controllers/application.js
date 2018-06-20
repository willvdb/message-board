import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import EmberRouter from '@ember/routing/router';

export default Controller.extend({
	apiService: service(),
	posts: Array(),
	actions: {
		async createPost(title, content) {
			await this.apiService.createPost({
				attachment: null,
				content: content,
				title: title
			})

			window.location.reload()
		},

		async updatePost(post) {
			await this.apiService.updatePost({
				attachment: null,
				content: post.content,
				title: post.title
			})

			window.location.reload()
		},

		async editPost(post) {
			post.editing = true
		},

		async deletePost(id) {
			await this.apiService.deletePost(id)

			window.location.reload()

		}
	}
});
