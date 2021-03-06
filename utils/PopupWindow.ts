import { toParams, toQuery } from './route';

class PopupWindow {
	private id: string;
	private readonly url: string;
	private options: object;
	private window: Window;
	private promise: Promise<string | object>;
	private _iid: number | null;

	constructor(id: string, url: string, options = {}) {
		this.id = id;
		this.url = url;
		this.options = options;
	}

	open() {
		const { url, id, options } = this;

		this.window = window.open(url, id, toQuery(options, ','));
	}

	close() {
		this.cancel();
		this.window.close();
	}

	poll() {
		this.promise = new Promise((resolve, reject) => {
			this._iid = window.setInterval(() => {
				try {
					const popup = this.window;

					if (!popup || popup.closed !== false) {
						this.close();

						reject(new Error('The popup was closed'));

						return;
					}

					if (popup.location.href === this.url || popup.location.pathname === 'blank') {
						return;
					}

					const params = toParams(popup.location.search.replace(/^\?/, ''));

					resolve(params);

					this.close();
				} catch (error: unknown) {
					/*
					 * Ignore DOMException: Blocked a frame with origin from accessing a
					 * cross-origin frame.
					 */
				}
			}, 500);
		});
	}

	cancel() {
		if (this._iid) {
			window.clearInterval(this._iid);
			this._iid = null;
		}
	}

	then(...args) {
		return this.promise.then(...args);
	}

	catch(...args) {
		return this.promise.then(...args);
	}

	static open(...args) {
		// @ts-ignore
		const popup = new this(...args);

		popup.open();
		popup.poll();

		return popup;
	}
}

export default PopupWindow;
