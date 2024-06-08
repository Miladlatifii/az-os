

class ClockPageReplacement {
    constructor(pageFrames) {
        this.pageFrames = pageFrames;
        this.clockHand = 0;
        this.pageTable = new Array(pageFrames).fill(null); // Initialize all frames as null
        this.pageFaults = 0;
    }

    referencePage(page) {
        if (!this.pageTable.some(entry => entry && entry.page === page)) {
            this.pageFaults++;
            while (true) {
                if (!this.pageTable[this.clockHand]) {
                    // If the frame is not used, replace it with the new page
                    this.pageTable[this.clockHand] = { page: page, referenced: true };
                    this.clockHand = (this.clockHand + 1) % this.pageFrames;
                    break;
                } else {
                    // If the frame is used, reset the reference bit
                    if (this.pageTable[this.clockHand].referenced) {
                        this.pageTable[this.clockHand].referenced = false;
                    } else {
                        // If the reference bit is not set, replace it with the new page
                        this.pageTable[this.clockHand] = { page: page, referenced: true };
                        this.clockHand = (this.clockHand + 1) % this.pageFrames;
                        break;
                    }
                }
                this.clockHand = (this.clockHand + 1) % this.pageFrames;
            }
        } else {
            // If the page is already in the frame, set its reference bit
            const index = this.pageTable.findIndex(entry => entry && entry.page === page);
            this.pageTable[index].referenced = true;
        }
    }

    getPageFaults() {
        return this.pageFaults;
    }

    getPageTable() {
        return this.pageTable.map(entry => entry ? entry.page : null);
    }
}

// Example usage
const pageFrames = 3;
const pagesToReference = [1, 3, 0, 3, 5, 6, 3];

const clock = new ClockPageReplacement(pageFrames);

pagesToReference.forEach(page => {
    clock.referencePage(page);
});

console.log("Page Table using Clock algorithm:", clock.getPageTable());
console.log("Total Page Faults:", clock.getPageFaults());




