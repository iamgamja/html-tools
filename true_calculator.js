// js의 계산은 정확하지 않으므로, 문자열로 정확한 계산을 하는 함수를 만들었습니다.
// 사용 예시: true_calculator("123456789012345678901234567890+1")         => "123456789012345678901234567891"
// 사용 예시: true_calculator("123456789012345678901234567890", "+", "1") => "123456789012345678901234567891"


  function change_minus(s) {  return is_minus(s) ? s.slice(1) : '-'+s  }
  function is_minus(s) {  return s.startsWith('-')  }

  function true_calculator() {
    if (arguments.length === 1) {
      if (/^\d+\+\d+$/.test(arguments[0])) { // 1+1
        var s1 = arguments[0].split('+')[0], p = '+', s2 = arguments[0].split('+')[1];
      } else if (/^-\d+\+\d+$/.test(arguments[0])) { // -1+1
        var s1 = arguments[0].split('+')[0], p = '+', s2 = arguments[0].split('+')[1];
      } else if (/^\d+-\d+$/.test(arguments[0])) { // 1-1
        var s1 = arguments[0].split('-')[0], p = '-', s2 = arguments[0].split('-')[1];
      } else if (/^-\d+-\d+$/.test(arguments[0])) { // -1-1
        var s1 = '-'+arguments[0].split('-')[1], p = '-', s2 = arguments[0].split('-')[2];
      } else {
        return NaN;
      }
    } else if (arguments.length === 3) {
      var s1 = arguments[0], p = arguments[1], s2 = arguments[2];
    } else {
      return NaN;
    }
    
    
    if (!(/^-?\d+$/.test(s1)) || !(/^-?\d+$/.test(s2))) {
      return NaN;
    }
    
    
    if ( !is_minus(s1) && p === '+' ) {               // 1+1
      return plus_calculator(s1, s2)                    // return s1+s2
    } else if ( !is_minus(s1) && p === '-' ) {        // 1-1
      if ( !is_minus(minus_calculator(s1, s2)) ) {      // s1 >= s2 (결과=양수)
        return minus_calculator(s1, s2)                   // return s1 - s2
      } else {                                          // s1 < s2 (결과=음수)
        return change_minus(minus_calculator(s2, s1))     // return -(s2-s1)
      }
    } else if ( is_minus(s1) && p === '+' ) {         // -1+1
      if ( !is_minus(minus_calculator(s2, s1)) ) {      // s2 >= s1 (결과=양수)
        return minus_calculator(s1, s2)                   // return s2 - s1
      } else {                                          // s2 < s1 (결과=음수)
        return change_minus(minus_calculator(s1, s2))     // return -(s1-s2)
      }
    } else if (is_minus(s1) && p === '-' ) {          // -1-1
      return change_minus(plue_calculator(s1, s2))      // return -(1+1)
    } else {
      return NaN;
    }
  }

  function plus_calculator(s1, s2) {
    // 만약 js로 정확하게 계산할 수 있다면, 계산합니다.
    if (Number.isSafeInteger(Number(s1)+Number(s2))) return String(Number(s1)+Number(s2))

    // 만약 js로 정확하게 계산할 수 없다면, 직접 계산합니다.
    if (s2.length !== 1) return plus_calculator(plus_calculator(s1.slice(0, -1), s2.slice(0, -1)) + s1.slice(-1), s2.slice(-1)) // s2가 한자리가 아니라면 -> 앞자리끼리 계산, 뒤에 붙이고 다시 계산.
    if (Number(s1.slice(-1)) + Number(s2) > 9) { // 마지막자리끼리 더했더니 9보다 크다 = 마지막 둘째자리(그 앞자리)에 1을 더한다
      return plus_calculator(s1.slice(0, -1), '1') + String(Number(s1.slice(-1)) + Number(s2) - 10)
    } else { // 아니면 그냥 뒷자리끼리만 계산
      return s1.slice(0, -1).replace(/^0+(?=.)/, "") + String(Number(s1.slice(-1)) + Number(s2))
    }
  }

  function minus_calculator(s1, s2) {
    // 만약 js로 정확하게 계산할 수 있다면, 계산합니다.
    if (Number.isSafeInteger(Number(s1)-Number(s2))) return String(Number(s1)-Number(s2))

    // 만약 js로 정확하게 계산할 수 없다면, 직접 계산합니다.
    if (s2.length !== 1) return minus_calculator((minus_calculator(s1.slice(0, -1), s2.slice(0, -1)) + s1.slice(-1)), s2.slice(-1)) // s2가 한자리가 아니라면 -> 앞자리끼리 계산, 뒤에 붙이고 다시 계산.
    if (Number(s1.slice(-1)) - Number(s2) < 0) { // 마지막자리끼리 뺐더니 0보다 작다 = 마지막 둘째자리에 1을 뺀다
      return minus_calculator(s1.slice(0, -1), '1') + String(Number(s1.slice(-1)) - Number(s2) + 10)
    } else { // 아니면 그냥 뒷자리끼리만 계산
      return s1.slice(0, -1).replace(/^0+(?=.)/, "") + String(Number(s1.slice(-1)) - Number(s2))
    }
  }
