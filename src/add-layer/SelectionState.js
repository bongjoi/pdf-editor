class SelectionState {}

class NoSelectionState extends SelectionState {}

class SelectingState extends SelectionState {}

class SelectedState extends SelectionState {
  constructor(
    selectedText,
    selectedSignature,
    selectedCheckSign,
    selectedImage
  ) {
    super();
    this.selectedText = selectedText;
    this.selectedSignature = selectedSignature;
    this.selectedCheckSign = selectedCheckSign;
    this.selectedImage = selectedImage;
  }
}

const NO_SELECTION_STATE = new NoSelectionState();
const SELECTING_STATE = new SelectingState();

export { NO_SELECTION_STATE, SELECTING_STATE, SelectedState, SelectionState };
