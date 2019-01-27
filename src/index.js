import { getFilters, setFilters } from "./filters"

console.log(getFilters());
setFilters({
    searchText: "",
    hideCompleted: true
});
console.log(getFilters());