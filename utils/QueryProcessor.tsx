export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("what is your andrew id")) {
    return "bgisagew";
  }

  if (query.toLowerCase().includes("what is your name")) {
    return "belami";
  }

  if (query.toLowerCase().includes("what is your age")) {
    return "67";
  }

  const q = query.toLowerCase();
  const listed = (q.split(":")[1] || "").match(/-?\d+/g)?.map(Number) || [];

  if (q.includes("largest") && listed.length > 0) {
    return String(Math.max(...listed));
  }

  if (q.includes("smallest") && listed.length > 0) {
    return String(Math.min(...listed));
  }

  if (q.includes("square and a cube")) {
    return listed.filter(isSixthPower).join(", ");
  }

  if (q.includes("prime")) {
    return listed.filter(isPrime).join(", ");
  }

  const fib = q.match(/(\d+)(?:st|nd|rd|th) number in the fibonacci/);
  if (fib) {
    return fibonacci(Number(fib[1])).toString();
  }

  const arithmetic = evaluateArithmetic(q);
  if (arithmetic !== null) {
    return arithmetic;
  }

  return "";
}

const OPERATORS = ["to the power of", "multiplied by", "times", "divided by", "plus", "minus"];
const PRECEDENCE = [["to the power of"], ["multiplied by", "times", "divided by"], ["plus", "minus"]];

function evaluateArithmetic(q: string): string | null {
  if (!q.includes("what is")) {
    return null;
  }
  const tokens = q.match(new RegExp(`-?\\d+|${OPERATORS.join("|")}`, "g")) || [];
  if (tokens.length < 3 || tokens.length % 2 === 0) {
    return null;
  }
  const nums: bigint[] = [];
  const ops: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const isNumber = /^-?\d+$/.test(tokens[i]);
    if (isNumber !== (i % 2 === 0)) {
      return null;
    }
    if (isNumber) {
      nums.push(BigInt(tokens[i]));
    } else {
      ops.push(tokens[i]);
    }
  }
  for (const level of PRECEDENCE) {
    let i = 0;
    while (i < ops.length) {
      if (level.includes(ops[i])) {
        nums.splice(i, 2, applyOperator(nums[i], ops[i], nums[i + 1]));
        ops.splice(i, 1);
      } else {
        i++;
      }
    }
  }
  return nums[0].toString();
}

function applyOperator(a: bigint, op: string, b: bigint): bigint {
  switch (op) {
    case "plus":
      return a + b;
    case "minus":
      return a - b;
    case "multiplied by":
    case "times":
      return a * b;
    case "divided by":
      return a / b;
    default: {
      let result = BigInt(1);
      for (let i = 0; i < Number(b); i++) {
        result *= a;
      }
      return result;
    }
  }
}

function isPrime(n: number): boolean {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function isSixthPower(n: number): boolean {
  const root = Math.round(Math.pow(n, 1 / 6));
  return [root - 1, root, root + 1].some((r) => r >= 0 && Math.pow(r, 6) === n);
}

function fibonacci(n: number): bigint {
  let a = BigInt(0);
  let b = BigInt(1);
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a;
}
