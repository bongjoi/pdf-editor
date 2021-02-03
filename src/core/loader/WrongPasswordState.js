import LoadingStatus from './LoadingStatus';

class WrongPasswordState extends LoadingStatus {
  constructor(verifyPasswordFn) {
    super();
    this.verifyPasswordFn = verifyPasswordFn;
  }
}

export default WrongPasswordState;
