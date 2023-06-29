const mapping: Record<string, string> = {
  'bill-payments': 'bill_payment',
  meters: 'meter',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
