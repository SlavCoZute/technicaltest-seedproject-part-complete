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

    if (!this.state.productFilters.length && this.state.providerFilter) {
      return this.state.deals.filter(deal => deal.provider.id === this.state.providerFilter)
    }

    function ignoreProductTypes (typesToIgnore = [], productTypes = []) {
      if (!typesToIgnore.length || !productTypes.length) return productTypes;
      return normalize(productTypes).filter(type => !normalize(typesToIgnore).includes(type))
    }

    let deals = this.state.deals.map(deal => ({
      ...deal,
      productTypes: ignoreProductTypes(["Phone"], deal.productTypes)
    }));

    return deals.filter(deal => deal.productTypes.length === this.state.productFilters.length)
      .filter(deal => {
        const matches = [];
        deal.productTypes.forEach(type => {
          this.state.productFilters.forEach(filter => matches.push(type.includes(filter)))
        });
        return matches.filter(match => match).length === deal.productTypes.length
      });
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
