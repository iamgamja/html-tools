// js의 계산은 정확하지 않으므로, 문자열로 정확한 계산을 하는 함수를 만들었습니다.
// 사용 예시: true_calculator("123456789012345678901234567890+1")         => "123456789012345678901234567891"
// 사용 예시: true_calculator("123456789012345678901234567890", "+", "1") => "123456789012345678901234567891"


  function change_minus(s) {  return s.startsWith('-') ? s.slice(1) : '-'+s  }

  function true_calculator() {
    if (arguments.length === 1) {
      if (/^\d+\+\d+$/.test(arguments[0])) { // 양수+양수
        var s1 = arguments[0].split('+')[0], p = '+', s2 = arguments[0].split('+')[1];
      } else if (/^-\d+\+\d+$/.test(arguments[0])) { // 음수+양수
        var s1 = arguments[0].split('+')[0], p = '+', s2 = arguments[0].split('+')[1];
        return change_minus(true_calculator(s1.slice(1), '-', s2))
      } else if (/^\d+-\d+$/.test(arguments[0])) { // 양수-양수 (양수+음수)
        var s1 = arguments[0].split('-')[0], p = '-', s2 = arguments[0].split('-')[1];
      } else if (/^-\d+-\d+$/.test(arguments[0])) { // 음수-양수 (음수+음수)
        var s1 = '-'+arguments[0].split('-')[1], p = '-', s2 = arguments[0].split('-')[2];
        console.log(s1, p, s2)
        return change_minus(true_calculator(s1.slice(1), '+', s2))
      } else {
        return NaN;
      }
    } else if (arguments.length === 3) {
      var s1 = arguments[0], p = arguments[1], s2 = arguments[2];
      if (s1.startsWith('-') && p === '+') return change_minus(true_calculator(s1.slice(1), '-', s2))
      if (s1.startsWith('-') && p === '-') return change_minus(true_calculator(s1.slice(1), '+', s2))
    } else {
      return NaN;
    }
    
    if (!(/^-?\d+$/.test(s1)) || !(/^-?\d+$/.test(s2))) {
      return NaN;
    }
        
    s1 = s1.replace(/^0+(?=.)/, ""); // 왼쪽0제거

    if (p === '+') { // 덧셈이라면
      // 만약 js로 정확하게 계산할 수 있다면, 계산합니다.
      if (Number.isSafeInteger(Number(s1)+Number(s2))) return String(Number(s1)+Number(s2))

      // 만약 js로 정확하게 계산할 수 없다면, 직접 계산합니다.
      if (s2.length !== 1) return true_calculator((true_calculator(s1.slice(0, -1), '+', s2.slice(0, -1)) + s1.slice(-1)), '+', s2.slice(-1)) // s2가 한자리가 아니라면 -> 앞자리끼리 계산, 뒤에 붙이고 다시 계산.
      if (Number(s1.slice(-1)) + Number(s2) > 9) { // 마지막자리끼리 더했더니 9보다 크다 = 마지막 둘째자리(그 앞자리)에 1을 더한다
        return (true_calculator(s1.slice(0, -1), '+', '1') + String(parseInt(s1.slice(-1)) + parseInt(s2) - 10)).replace(/^0+(?=.)/, "")
      } else { // 아니면 그냥 뒷자리끼리만 계산
        return (s1.slice(0, -1) + String(Number(s1.slice(-1)) + Number(s2))).replace(/^0+(?=.)/, "")
      }
    } else if (p === '-') { // 뺄셈이라면
      // 만약 js로 정확하게 계산할 수 있다면, 계산합니다.
      if (Number.isSafeInteger(Number(s1)-Number(s2))) return String(Number(s1)-Number(s2))

      // 만약 js로 정확하게 계산할 수 없다면, 직접 계산합니다.
      if (s2.length !== 1) return true_calculator((true_calculator(s1.slice(0, -1), '-', s2.slice(0, -1)) + s1.slice(-1)), '-', s2.slice(-1)) // s2가 한자리가 아니라면 -> 앞자리끼리 계산, 뒤에 붙이고 다시 계산.
      if (Number(s1) < Number(s2)) return change_minus(true_calculator(s2, '-', s1))
      if (Number(s1.slice(-1)) - Number(s2) < 0) { // 마지막자리끼리 뺐더니 0보다 작다 = 마지막 둘째자리에 1을 뺀다
        return (true_calculator(s1.slice(0, -1), '-', '1') +''+ (Number(s1.slice(-1)) - Number(s2) + 10)).replace(/^0+(?=.)/, "")
      } else { // 아니면 그냥 뒷자리끼리만 계산
        return (s1.slice(0, -1) + String(Number(s1.slice(-1)) - Number(s2))).replace(/^0+(?=.)/, "")
      }
    } else { // 지원하지 않는 기호
      return NaN;
    }
  }
