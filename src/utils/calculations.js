export function getFieldGross(field) {
  return field.acres * field.yieldPerAcre * field.pricePerBushel;
}

export function getFieldInputCost(field, inputCosts) {
  return field.acres * getInputCostPerAcre(inputCosts);
}

export function getFieldNet(field, inputCosts) {
  return getFieldGross(field) - getFieldInputCost(field, inputCosts);
}

export function getFieldNetPerAcre(field, inputCosts) {
  if (!field.acres) {
    return 0;
  }

  return getFieldNet(field, inputCosts) / field.acres;
}

export function getFieldBreakEvenPrice(field, inputCosts) {
  if (!field.yieldPerAcre) {
    return 0;
  }

  return getInputCostPerAcre(inputCosts) / field.yieldPerAcre;
}

export function getFieldMarginPerBushel(field, inputCosts) {
  return field.pricePerBushel - getFieldBreakEvenPrice(field, inputCosts);
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

export function getAverageNetPerAcre(fields, inputCosts) {
  const totalAcres = getTotalAcres(fields);

  if (!totalAcres) {
    return 0;
  }

  return getProjectedNet(fields, inputCosts) / totalAcres;
}
