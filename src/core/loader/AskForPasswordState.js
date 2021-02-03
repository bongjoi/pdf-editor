import LoadingStatus from './LoadingStatus';

class AskForPasswordState extends LoadingStatus {
  constructor(verifyPasswordFn) {
    super();
    this.verifyPasswordFn = verifyPasswordFn;
  }
}

export default AskForPasswordState;
