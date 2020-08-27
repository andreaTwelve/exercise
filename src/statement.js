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

function getTragedyAmount(thisAmount, perf) {
  thisAmount = 40000;
  if (perf.audience > 30) {
    thisAmount += 1000 * (perf.audience - 30);
  }
  return thisAmount;
}

function getAmountedOwner(result, totalAmount, volumeCredits) {
  result += `Amount owed is ${formatAmount(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function getPerfAmount(result, play, thisAmount, perf) {
  result += ` ${play.name}: ${formatAmount(thisAmount)} (${perf.audience} seats)\n`;
  return result;
}

function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    const play = getPlay(plays, perf);
    let thisAmount = 0;
    switch (play.type) {
      case 'tragedy':
        thisAmount = getTragedyAmount(thisAmount, perf);
        break;
      case 'comedy':
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    volumeCredits = getVolumeCredits(volumeCredits, perf, play);
    totalAmount += thisAmount;
    //print line for this order
    result = getPerfAmount(result, play, thisAmount, perf);
  }
  result = getAmountedOwner(result, totalAmount, volumeCredits);
  return result;
}

module.exports = {
  statement,
};
