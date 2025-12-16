import { computed, Injectable,signal,WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  
  // Use a WritableSignal to track the request count
  private busyRequestCount: WritableSignal<number> = signal(0);

  // Use a Computed Signal to expose the loading state
  // Only the component needs to read this:
 readonly isLoading = computed(() => this.busyRequestCount() > 0); 

 /**
   * Called when a request starts.
   * Increments the count.
   */

busy(): void {
     // signal.update() is the clean way to change the signal value
    this.busyRequestCount.update(count => count + 1); 
    console.log(`[BUSY SERVICE] BUSY - Count is now: ${this.busyRequestCount()}`);
  }

/**
   * Called when a request finishes (success or error).
   * Decrements the count, but ensures it never falls below zero.
   */
  idle(): void {
    // Math.max(0, count - 1) prevents the counter from going negative
    this.busyRequestCount.update(count => Math.max(0, count - 1));
    console.log(`[BUSY SERVICE] IDLE - Count is now: ${this.busyRequestCount()}`);
  }


  //loading = false;
  //busyRequestCount = 0;

  //busy() {
   
  //   this.busyRequestCount++;
  //   this.loading = true;
  //   // LOG 3: Counter Incremented
  //   console.log(`[BUSY SERVICE] BUSY - Count is now: ${this.busyRequestCount}`);
  // }

  //   idle() {
  //        this.busyRequestCount--;
  //        console.log(`[BUSY SERVICE] IDLE - Count is now: ${this.busyRequestCount}`);
  // if ( this.busyRequestCount <= 0 ) {

  //       console.log(`[BUSY SERVICE] IDLE - Counter reached zero. Hiding spinner.`);
  //     this.busyRequestCount = 0;
  //      this.loading = false; // Emit false when the LAST request finishes         
  //            }
    }

//   // Use a BehaviorSubject to emit the loading state
//     private loadingSubject = new BehaviorSubject<boolean>(false);

//     // Expose the loading state as a public Observable (using .asObservable())
//     loading$ = this.loadingSubject.asObservable();
    
//  // loading= false;
//   busyRequestCount = 0;

// busy() {
//         if (this.busyRequestCount === 0) {
//             this.loadingSubject.next(true); // Only emit true when the FIRST request starts
//         }
//         this.busyRequestCount++;
//         console.log(`[BUSY SERVICE] BUSY - Count is now: ${this.busyRequestCount}`);
//     }

//     idle() {
//         this.busyRequestCount--;
//         console.log(`[BUSY SERVICE] IDLE - Count is now: ${this.busyRequestCount}`);

//         if ( this.busyRequestCount <= 0 )
//         {
//             console.log(`[BUSY SERVICE] IDLE - Counter reached zero. Hiding spinner.`);
//             this.loadingSubject.next(false); // Emit false when the LAST request finishes
//             this.busyRequestCount = 0;
//         }
//     }


  // busy() {
  //   this.loading = true;
  //   this.busyRequestCount++;
  //   // LOG 3: Counter Incremented
  //   console.log(`[BUSY SERVICE] BUSY - Count is now: ${this.busyRequestCount}`);
  // }

//   idle() {
//     this.busyRequestCount--;

//     // LOG 4: Counter Decremented
//     console.log(`[BUSY SERVICE] IDLE - Count is now: ${this.busyRequestCount}`);

//     if ( this.busyRequestCount <= 0 )
//     {
// // LOG 5: Progress Bar Hiding
//         console.log(`[BUSY SERVICE] IDLE - Counter reached zero. Hiding spinner.`);

//         this.loading= false;
//         this.busyRequestCount = 0;
//     }
//   }
//}
