export default class City {
  constructor(
    title = '',
    location = '',
    numberOfResidents = '',
    square = '',
    yearOfFoundation = '',
  ) {
    this.title = title;
    this.location = location;
    this.numberOfResidents = numberOfResidents;
    this.square = square;
    this.yearOfFoundation = yearOfFoundation;
  }
}
