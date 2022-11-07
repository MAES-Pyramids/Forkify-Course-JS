import { async } from 'regenerator-runtime';
import { TIMEOUT } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function GetJSON(Full_URL) {
  try {
    const res = await Promise.race([fetch(Full_URL), timeout(TIMEOUT)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}
export const numberToFraction = function (amount) {
  // This is a whole number and doesn't need modification.
  if (parseFloat(amount) === parseInt(amount)) {
    return amount;
  }
  // Next 12 lines are cribbed from https://stackoverflow.com/a/23575406.
  const gcd = function (a, b) {
    if (b < 0.0000001) {
      return a;
    }
    return gcd(b, Math.floor(a % b));
  };
  const len = amount.toString().length - 2;
  let denominator = Math.pow(10, len);
  let numerator = amount * denominator;
  var divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;
  let base = 0;
  // In a scenario like 3/2, convert to 1 1/2
  // by pulling out the base number and reducing the numerator.
  if (numerator > denominator) {
    base = Math.floor(numerator / denominator);
    numerator -= base * denominator;
  }
  amount = Math.floor(numerator) + '/' + Math.floor(denominator);
  if (base) {
    amount = base + ' ' + amount;
  }
  return amount;
};
