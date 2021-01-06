let globalId = 0;

class File {
  constructor(id = null, filename, url = "", filesize, date, uploaded = false) {
    if (id === null) {
      this.id = globalId.toString();
      globalId++;
    } else {
      this.id = id;
    }
    this.filename = filename;
    this.url = url;
    this.filesize = filesize;
    this.date = date;
    this.uploaded = uploaded;
  }
}

export default File;
