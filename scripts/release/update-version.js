const fs = require('fs');
const { join } = require('path');

const PACKAGES_DIR = join(__dirname, '../../packages');
const INFERNO_VERSION = require(join(__dirname, '../../package.json')).version;

fs.readdir(PACKAGES_DIR, (err, paths) => {
	if (err) {
		throw Error(err);
	}

	let failedToUpdate = false;
	for (let i = 0; i < paths.length; i += 1) {
		const pathStat = fs.statSync(join(PACKAGES_DIR, paths[i]));

		if (pathStat.isDirectory()) {
			const pkgJSONPath = join(PACKAGES_DIR, paths[i], 'package.json');
			const pkgJSON = require(pkgJSONPath);

			if (pkgJSON.version !== INFERNO_VERSION) {
				pkgJSON.version = INFERNO_VERSION;
				const pkgJSONStr = JSON.stringify(pkgJSON, null, 2);

				try {
					fs.writeFileSync(pkgJSONPath, pkgJSONStr);
				} catch (e) {
					failedToUpdate = true;
					console.error(
						'Failed to update %s: %s',
						pkgJSON.name,
						e
					);
				}
			}
		}
	}

	if (failedToUpdate) {
		process.exit(1);
	}
});
