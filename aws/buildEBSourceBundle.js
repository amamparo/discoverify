import fs from 'fs';
import zipFolder from 'zip-folder';

(() => {
  return new Promise((resolve) => {
    fs.writeFileSync('.build/server/Procfile', 'web: node .');
    zipFolder('.build/server', '.build/server/bundle.zip', resolve);
  });
})();