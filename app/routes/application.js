import Route from '@ember/routing/route';
import {inject as service } from '@ember/service';

export default Route.extend({
	apiService: service(),
	async model() {
		return await this.get('apiService').getPosts()
	},
	actions: {}

});
