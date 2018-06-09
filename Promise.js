class Promise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if(this.status === 'pending'){
        this.status = 'resolved';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    }
    let reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }
    executor(resolve,reject);
  }
  then(onFufilled,onRejected){
    if(this.status === 'resolved'){
      onFufilled(this.value);
    }
    if (this.status === 'rejected') {
      onRejected(this.reason);
    }
    if( this.status === 'pending'){
      this.onResolvedCallbacks.push(()=>{
        onFufilled(this.value);
      });
      this.onRejectedCallbacks.push(()=>{
        onRejected(this.reason);
      })
    }
  }
}
module.exports = Promise;