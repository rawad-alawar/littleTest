var AMLTranslator = (function(){
  return{
    translate: function(aml){
      var alien= aml;
      alien = alien.replace('^%', "<STRONG>");
      alien = alien.replace('^!%', "</STRONG>");
      alien = alien.replace('^~', "<EM>");
      alien = alien.replace('^!~', "</EM>");
      return alien
    }
  };
}());


if(module.exports){
  module.exports = AMLTranslator
}
