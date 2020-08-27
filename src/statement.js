function formatAmount(amount) {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  return format(amount / 100);
}

function getVolumeCredits(volumeCredits, perf, play) {
  volumeCredits += Math.max(perf.audience - 30, 0);
  // add extra credit for every ten comedy attendees
  if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
  return volumeCredits;
}

function getPlay(plays, perf) {
  return plays[perf.playID];
}

function getTragedyAmount(perf) {
  let thisAmount = 40000;
  if (perf.audience > 30) {
    thisAmount += 1000 * (perf.audience - 30);
  }
  return thisAmount;
}

function getComedyAmount(perf) {
  let thisAmount = 30000;
  if (perf.audience > 20) {
    thisAmount += 10000 + 500 * (perf.audience - 20);
  }
  thisAmount += 300 * perf.audience;
  return thisAmount;
}

function calculateAmount(type, perf) {
  switch (type) {
    case 'tragedy':
      return getTragedyAmount(perf);
      //break;
    case 'comedy':
      return getComedyAmount(perf);
      //break;
    default:
      throw new Error(`unknown type: ${type}`);
  }
}

function calculateVolumeCredits(performances, plays) {
  let volumeCredits = 0;
  for (let perf of performances) {
    const play = getPlay(plays, perf);
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
  }
  return volumeCredits
}

function calculateTotalAmount(performances, plays) {
  let totalAmount = 0;
  for (let perf of performances) {
    const play = getPlay(plays, perf);
    let thisAmount = calculateAmount(play.type, perf);
    totalAmount += thisAmount;
  }
  return totalAmount;
}

function getPerfAmount(result, play, thisAmount, perf) {
  result += ` ${play.name}: ${formatAmount(thisAmount)} (${perf.audience} seats)\n`;
  return result;
}

function statement (invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  let totalAmount = 0;
  let volumeCredits = 0;

  for (let perf of invoice.performances) {
    const play = getPlay(plays, perf);
    let thisAmount = calculateAmount(play.type, perf);
    totalAmount += thisAmount;
    volumeCredits = getVolumeCredits(volumeCredits, perf, play);
    //print line for this order
    result = getPerfAmount(result, play, thisAmount, perf);
  }
  result += `Amount owed is ${formatAmount(calculateTotalAmount(invoice.performances, plays))}\n`;
  result += `You earned ${calculateVolumeCredits(invoice.performances, plays)} credits \n`;
  return result;
}

module.exports = {
  statement,
};
