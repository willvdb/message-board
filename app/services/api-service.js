import Service from '@ember/service';

export default Service.extend({
	firstName: 'will',
	lastName: 'vandenberghe',
	host: 'http://167.99.111.228:4000/',
	data: null,
	get key() {
		return this.firstName + '.' + this.lastName
	},

	call(endpoint, method = 'GET', data = {}) {
		return new Promise((resolve, reject) => {
			const options = {
				url: this.host + endpoint,
				data: Object.assign(data,{
					key: this.key
				})
			}
			switch (method) {
				case 'GET':
					return $.ajax(Object.assign(options, {
						type: 'GET',
						success: res => resolve(res),
						failure: err => reject(err)
					}));
				case 'POST':
					return $.ajax(Object.assign(options, {
						type: 'POST',
						contentType: 'application/json',
						data: JSON.stringify(Object.assign(data,{
							key: this.key
						})),
						success: res => resolve(res),
						failure: err => reject(err)
						
					}));
				case 'DELETE':
					return $.ajax(Object.assign(options, {
						type: 'DELETE',
						success: res => resolve(res),
						failure: err => reject(err)
					}));
			}
		})

	},

	async getPosts(){
		return await this.call(`posts`)
	},

	async getPost(id){
		return await this.call(`posts/${id}`)
	},

	async createPost(data){
		return await this.call(`posts`, 'POST', {
			title: data.title,
			content: data.content,
			post: Object.assign(data, {
				key: this.key
			})
		})
	},

	async updatePost(data){
		return await this.call(`posts`, 'POST', {
			title: data.title,
			content: data.content,
			post: Object.assign(data, {
				key: this.key
			})
		})
	},

	async deletePost(id) {
		return await this.call(`posts/${id}`, 'DELETE')
	}
});
