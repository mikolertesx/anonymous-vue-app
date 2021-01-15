import { v4 as uuid } from "uuid";

class File {
  constructor(id = null, filename, url = "", filesize, date, uploaded = false) {
    if (id === null) {
      this.id = uuid().toString();
    } else {
      this.id = id;
    }
    this.filename = filename;
    this.url = url;
    this.filesize = filesize;
    this.date = date;
    this.uploaded = uploaded;
    this.progress = 0;
  }
}

export default File;
