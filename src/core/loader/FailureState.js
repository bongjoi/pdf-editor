import LoadingStatus from './LoadingStatus';

class FailureState extends LoadingStatus {
  constructor(error) {
    super();
    this.error = error;
  }
}

export default FailureState;
