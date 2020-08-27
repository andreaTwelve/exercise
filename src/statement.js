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

function getPerfAmount(performances, plays) {
  let result = '';
  let perfAmount = [];
  for (let perf of performances) {
    const play = getPlay(plays, perf);
    let thisAmount = calculateAmount(play.type, perf);
    let performance = {
      name: play.name,
      amount: formatAmount(thisAmount),
      seats: perf.audience
    };
    perfAmount.push(performance);
    //result += ` ${play.name}: ${formatAmount(thisAmount)} (${perf.audience} seats)\n`;
  }
  return perfAmount;
}

function getStatementResult(invoice, plays) {
  return {
    customer: invoice.customer,
    performances: getPerfAmount(invoice.performances, plays),
    amount: formatAmount(calculateTotalAmount(invoice.performances, plays)),
    credits: calculateVolumeCredits(invoice.performances, plays)
  }
}

function printHtml(data) {
  return `<h1>Statement for ${data.customer}</h1>\n` + `<table>\n`
      + `<tr><th>play</th><th>seats</th><th>cost</th></tr>`
      + data.performances.map(performance => {
        return ` <tr><td>${performance.name}</td><td>${performance.seats}</td><td>${performance.amount}</td></tr>\n`
        //console.log(performance)
      }).join('')
      + `</table>\n`
      + `<p>Amount owed is <em>${data.amount}</em></p>\n`
      + `<p>You earned <em>${data.credits}</em> credits</p>\n`;
}

function printString(data) {
  return `Statement for ${data.customer}\n`
      + data.performances.map(performance => {
        return ` ${performance.name}: ${performance.amount} (${performance.seats} seats)\n`
        //console.log(performance)
      }).join('')
      + `Amount owed is ${data.amount}\n`
      + `You earned ${data.credits} credits \n`
}

function statement (invoice, plays) {
  // let result = `Statement for ${invoice.customer}\n`;
  // result += getPerfAmount(invoice.performances, plays);
  // result += `Amount owed is ${formatAmount(calculateTotalAmount(invoice.performances, plays))}\n`;
  // result += `You earned ${calculateVolumeCredits(invoice.performances, plays)} credits \n`;
  return printString(getStatementResult(invoice, plays));
}

function statementByHtml (invoice, plays) {
  return printHtml(getStatementResult(invoice, plays));
}

module.exports = {
  statement,
  statementByHtml
};
