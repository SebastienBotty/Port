const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(__dirname, 'portfolio.js'), 'utf8');
require('postcss').parse(fs.readFileSync(path.join(__dirname, 'portfolio.css'), 'utf8'));

for (const reduceMotion of [false, true]) {
  const dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true });
  const { window } = dom;
  window.matchMedia = query => ({ matches: query.includes('reduced-motion') && reduceMotion });
  // jsdom has no native dialog UI; this checks content and focus restoration.
  window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  window.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new window.Event('close')); };
  window.eval(script);
  const doc = window.document;
  const click = selector => doc.querySelector(selector).click();
  click('#previous');
  assert.equal(doc.getElementById('active-project').textContent, 'Tou');
  click('#next');
  assert.equal(doc.getElementById('active-project').textContent, 'CheckCar');
  click('.object[data-project="undercover"]');
  assert.equal(doc.getElementById('active-project').textContent, 'Undercover');
  assert.equal(doc.getElementById('project-dialog').open, false);
  click('.object[data-project="undercover"]');
  assert.equal(doc.getElementById('dialog-title').textContent, 'Undercover');
  assert.equal(doc.getElementById('project-dialog').open, true);
  click('.dialog-close');
  assert.equal(doc.activeElement.dataset.project, 'undercover');
  click('[data-open="checkcar"]');
  assert.equal(doc.getElementById('dialog-link').getAttribute('href'), 'https://www.checkcar.be/');
  click('.dialog-close');
  click('[data-open="europe"]');
  assert.equal(doc.getElementById('dialog-image').hidden, true);
  assert.equal(doc.getElementById('dialog-image').hasAttribute('src'), false);
  assert.equal(doc.getElementById('dialog-link').hidden, true);
  assert.equal(doc.getElementById('dialog-link').hasAttribute('href'), false);
  for (const element of doc.querySelectorAll('[src], a[href], link[href]')) {
    const value = element.getAttribute('src') || element.getAttribute('href');
    if (value.startsWith('#')) { if (value.length > 1) assert.ok(doc.getElementById(value.slice(1)), value); }
    else if (!/^[a-z]+:/i.test(value)) assert.ok(fs.existsSync(path.resolve(__dirname, value)), value);
  }
  assert.equal(doc.querySelectorAll('h1').length, 1);
  dom.window.close();
}
console.log('OK: project cycling, modal content/reset, focus return, assets/anchors, CSS; normal and reduced-motion preferences.');
