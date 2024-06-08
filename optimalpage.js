

class OptimalPageReplacement {
  constructor(pageFrames, pageReferences) {
    this.pageFrames = pageFrames;
    this.pageReferences = pageReferences;
    this.pageFaults = 0;
    this.pageQueue = [];
  }

  referencePage() {
    for (let i = 0; i < this.pageReferences.length; i++) {
      const page = this.pageReferences[i];
      if (!this.pageQueue.includes(page)) {
        this.pageFaults++;
        if (this.pageQueue.length >= this.pageFrames) {
          let farthestIndex = -1;
          let farthestPage = -1;
          for (let j = 0; j < this.pageQueue.length; j++) {
            let nextIndex = this.pageReferences
              .slice(i + 1)
              .indexOf(this.pageQueue[j]);
            if (nextIndex === -1) {
              farthestPage = this.pageQueue[j];
              break;
            }
            if (nextIndex > farthestIndex) {
              farthestIndex = nextIndex;
              farthestPage = this.pageQueue[j];
            }
          }
          const index = this.pageQueue.indexOf(farthestPage);
          this.pageQueue.splice(index, 1);
        }
        this.pageQueue.push(page);
      }
    }
  }

  getPageFaults() {
    return this.pageFaults;
  }
}

// Example usage
const pageFrames = 3;
const pageReferences = [1, 3, 0, 3, 5, 6, 3];

const optimal = new OptimalPageReplacement(pageFrames, pageReferences);
optimal.referencePage();

console.log("Page Faults using Optimal:", optimal.getPageFaults());




