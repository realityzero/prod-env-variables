import * as core from "@actions/core";

let isProd = core.getInput("isProd") === 'true';
console.log(`isProd set to: ${isProd}`);

const keysInput = core.getInput("keys", {
	required: true
});

const keys = keysInput.split(/\r?\n/);
console.log("evaluating", keys);

for (let key of keys) {
	if (isProd === true) {
		console.log("checking for key", `${key}_PROD`);
		const value = process.env[`${key}_PROD`];
		console.log(`replacing ${key} with value from ${key}_PROD`);
		core.exportVariable(key, value);
	} else {
		console.log("checking for key", key);
		const value = process.env[key];
		if (value) {
			core.exportVariable(key, value);
		}
	}
}
