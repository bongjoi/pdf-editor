import LoadingStatus from './LoadingStatus';

class LoadingState extends LoadingStatus {
  constructor(percentages) {
    super();
    this.percentages = percentages;
  }
}

export default LoadingState;
