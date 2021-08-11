function checkSpam(str) {
  /*Чтобы проверка была нечувствительна к регистру, сначала мы приводим проверочные слова к нижнему регистру,
  а затем и саму строку, которую проверяем*/
  let xSpam = 'XXX'.toLowerCase();
  let betSpam = '1xBet'.toLowerCase();

  if (str.toLowerCase().includes(xSpam) === true || str.toLowerCase().includes(betSpam) === true) {
    return true;
  } else {
    return false;
  }
}
