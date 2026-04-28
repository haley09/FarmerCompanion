export function getFieldGross(field) {
  return field.acres * field.yieldPerAcre * field.pricePerBushel;
}

export function getTotalGross(fields) {
  return fields.reduce((total, field) => total + getFieldGross(field), 0);
}

export function getTotalAcres(fields) {
  return fields.reduce((total, field) => total + field.acres, 0);
}

export function getInputCostPerAcre(inputCosts) {
  return inputCosts.reduce((total, input) => total + input.costPerAcre, 0);
}

export function getTotalInputCost(fields, inputCosts) {
  return getTotalAcres(fields) * getInputCostPerAcre(inputCosts);
}

export function getProjectedNet(fields, inputCosts) {
  return getTotalGross(fields) - getTotalInputCost(fields, inputCosts);
}
