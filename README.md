# localdb

Wrapper für lokale IndexedDB für meine Framework-Anwendungen.

Wird als JS-Modul bei [Notebook](https://gogs.levelupsoftware.de/levelupsoftware/notebook) eingebunden:

```js
import * as LocalDb from "/static/localdb/LocalDb.js";
LocalDb.init('notebook', 8, ['book', 'page']);
```