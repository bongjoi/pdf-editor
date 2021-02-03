import LoadingStatus from './LoadingStatus';

class CompletedState extends LoadingStatus {
  constructor(doc) {
    super();
    this.doc = doc;
  }
}

export default CompletedState;
