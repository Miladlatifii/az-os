
class FIFOPageReplacement {
  constructor(pageFrames) {
    this.pageFrames = pageFrames;
    this.pageQueue = [];
    this.pageFaults = 0;
  }

  referencePage(page) {
    if (!this.pageQueue.includes(page)) {
      this.pageFaults++;
      if (this.pageQueue.length >= this.pageFrames) {
        this.pageQueue.shift(); // Remove the oldest page
      }
      this.pageQueue.push(page); // Add the new page
    }
  }

  getPageFaults() {
    return this.pageFaults;
  }
}

// Example usage
const pageFrames = 3;
const pagesToReference = [1, 3, 0, 3, 5, 6, 3];

const fifo = new FIFOPageReplacement(pageFrames);

pagesToReference.forEach((page) => {
  fifo.referencePage(page);
});

console.log("Page Faults using FIFO:", fifo.getPageFaults());



