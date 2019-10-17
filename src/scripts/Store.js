import Observable from "./Observable";
import {normalize} from "./utils";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null
    };
  }

  get deals() {
    return this.filter();
  }

  filter() {
    if (!this.state.productFilters.length && !this.state.providerFilter) return this.state.deals;

    let deals = this.state.deals.map(deal => ({...deal, productTypes: normalize(deal.productTypes)}));

    return deals.filter(deal =>
      deal.productTypes.filter(type => type.includes("broadband")).length
      && deal.productTypes.length === 2);
  }

  setDeals(data) {
    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;
