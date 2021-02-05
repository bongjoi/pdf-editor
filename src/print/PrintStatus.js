let PrintStatus;

(function (PrintStatus) {
  PrintStatus['Inactive'] = 'Inactive';
  PrintStatus['Preparing'] = 'Preparing';
  PrintStatus['Cancelled'] = 'Cancelled';
  PrintStatus['Ready'] = 'Ready';
})(PrintStatus || (PrintStatus = {}));

export default PrintStatus;
