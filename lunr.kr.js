/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory)
    } else if (typeof exports === 'object') {
        /**
         * Node. Does not work with strict CommonJS, but
         * only CommonJS-like environments that support module.exports,
         * like Node.
         */
        module.exports = factory()
    } else {
        // Browser globals (root is window)
        factory()(root.lunr);
    }
}(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return function(lunr) {
        /* throw error if lunr is not yet included */
        if ('undefined' === typeof lunr) {
            throw new Error('Lunr is not present. Please include / require Lunr before this script.');
        }

        /* throw error if lunr stemmer support is not yet included */
        if ('undefined' === typeof lunr.stemmerSupport) {
            throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
        }

        /* register specific locale function */
        lunr.kr = function () {
            this.pipeline.reset();
            this.pipeline.add(
                lunr.kr.trimmer,
                lunr.kr.stopWordFilter,
                lunr.kr.stemmer
            );

            // for lunr version 2
            // this is necessary so that every searched word is also stemmed before
            // in lunr <= 1 this is not needed, as it is done using the normal pipeline
            if (this.searchPipeline) {
                this.searchPipeline.reset();
                this.searchPipeline.add(lunr.kr.stemmer)
            }
        };

        /* lunr trimmer function */
        lunr.kr.wordCharacters = "가나다라마바사아자차카타파하가-힣ㄱ-ㅎㅏ-ㅣ";
        lunr.kr.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.kr.wordCharacters);

        lunr.Pipeline.registerFunction(lunr.kr.trimmer, 'trimmer-kr');

        /* lunr stemmer function */
        lunr.kr.stemmer = (function() {
            /* create the wrapped stemmer object */
          var Among = lunr.stemmerSupport.Among,
              SnowballProgram = lunr.stemmerSupport.SnowballProgram,
              st = new function DutchStemmer() {
                var a_0 = [new Among("", -1, 6), new Among("\u00E1", 0, 1),
                      new Among("\u00E4", 0, 1), new Among("\u00E9", 0, 2),
                      new Among("\u00EB", 0, 2), new Among("\u00ED", 0, 3),
                      new Among("\u00EF", 0, 3), new Among("\u00F3", 0, 4),
                      new Among("\u00F6", 0, 4), new Among("\u00FA", 0, 5),
                      new Among("\u00FC", 0, 5)
                    ],
                    a_1 = [new Among("", -1, 3),
                      new Among("I", 0, 2), new Among("Y", 0, 1)
                    ],
                    a_2 = [
                      new Among("dd", -1, -1), new Among("kk", -1, -1),
                      new Among("tt", -1, -1)
                    ],
                    a_3 = [new Among("ene", -1, 2),
                      new Among("se", -1, 3), new Among("en", -1, 2),
                      new Among("heden", 2, 1), new Among("s", -1, 3)
                    ],
                    a_4 = [
                      new Among("end", -1, 1), new Among("ig", -1, 2),
                      new Among("ing", -1, 1), new Among("lijk", -1, 3),
                      new Among("baar", -1, 4), new Among("bar", -1, 5)
                    ],
                    a_5 = [
                      new Among("aa", -1, -1), new Among("ee", -1, -1),
                      new Among("oo", -1, -1), new Among("uu", -1, -1)
                    ],
                    g_v = [17, 65,
                      16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128
                    ],
                    g_v_I = [1, 0, 0,
                      17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128
                    ],
                    g_v_j = [
                      17, 67, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128
                    ],
                    I_p2, I_p1, B_e_found, sbp = new SnowballProgram();
                this.setCurrent = function(word) {
                  sbp.setCurrent(word);
                };
                this.getCurrent = function() {
                  return sbp.getCurrent();
                };

                function r_prelude() {
                  var among_var, v_1 = sbp.cursor,
                      v_2, v_3;
                  while (true) {
                    sbp.bra = sbp.cursor;
                    among_var = sbp.find_among(a_0, 11);
                    if (among_var) {
                      sbp.ket = sbp.cursor;
                      switch (among_var) {
                        case 1:
                          sbp.slice_from("a");
                          continue;
                        case 2:
                          sbp.slice_from("e");
                          continue;
                        case 3:
                          sbp.slice_from("i");
                          continue;
                        case 4:
                          sbp.slice_from("o");
                          continue;
                        case 5:
                          sbp.slice_from("u");
                          continue;
                        case 6:
                          if (sbp.cursor >= sbp.limit)
                            break;
                          sbp.cursor++;
                          continue;
                      }
                    }
                    break;
                  }
                  sbp.cursor = v_1;
                  sbp.bra = v_1;
                  if (sbp.eq_s(1, "y")) {
                    sbp.ket = sbp.cursor;
                    sbp.slice_from("Y");
                  } else
                    sbp.cursor = v_1;
                  while (true) {
                    v_2 = sbp.cursor;
                    if (sbp.in_grouping(g_v, 97, 232)) {
                      v_3 = sbp.cursor;
                      sbp.bra = v_3;
                      if (sbp.eq_s(1, "i")) {
                        sbp.ket = sbp.cursor;
                        if (sbp.in_grouping(g_v, 97, 232)) {
                          sbp.slice_from("I");
                          sbp.cursor = v_2;
                        }
                      } else {
                        sbp.cursor = v_3;
                        if (sbp.eq_s(1, "y")) {
                          sbp.ket = sbp.cursor;
                          sbp.slice_from("Y");
                          sbp.cursor = v_2;
                        } else if (habr1(v_2))
                          break;
                      }
                    } else if (habr1(v_2))
                      break;
                  }
                }

                function habr1(v_1) {
                  sbp.cursor = v_1;
                  if (v_1 >= sbp.limit)
                    return true;
                  sbp.cursor++;
                  return false;
                }

                function r_mark_regions() {
                  I_p1 = sbp.limit;
                  I_p2 = I_p1;
                  if (!habr2()) {
                    I_p1 = sbp.cursor;
                    if (I_p1 < 3)
                      I_p1 = 3;
                    if (!habr2())
                      I_p2 = sbp.cursor;
                  }
                }

                function habr2() {
                  while (!sbp.in_grouping(g_v, 97, 232)) {
                    if (sbp.cursor >= sbp.limit)
                      return true;
                    sbp.cursor++;
                  }
                  while (!sbp.out_grouping(g_v, 97, 232)) {
                    if (sbp.cursor >= sbp.limit)
                      return true;
                    sbp.cursor++;
                  }
                  return false;
                }

                function r_postlude() {
                  var among_var;
                  while (true) {
                    sbp.bra = sbp.cursor;
                    among_var = sbp.find_among(a_1, 3);
                    if (among_var) {
                      sbp.ket = sbp.cursor;
                      switch (among_var) {
                        case 1:
                          sbp.slice_from("y");
                          break;
                        case 2:
                          sbp.slice_from("i");
                          break;
                        case 3:
                          if (sbp.cursor >= sbp.limit)
                            return;
                          sbp.cursor++;
                          break;
                      }
                    }
                  }
                }

                function r_R1() {
                  return I_p1 <= sbp.cursor;
                }

                function r_R2() {
                  return I_p2 <= sbp.cursor;
                }

                function r_undouble() {
                  var v_1 = sbp.limit - sbp.cursor;
                  if (sbp.find_among_b(a_2, 3)) {
                    sbp.cursor = sbp.limit - v_1;
                    sbp.ket = sbp.cursor;
                    if (sbp.cursor > sbp.limit_backward) {
                      sbp.cursor--;
                      sbp.bra = sbp.cursor;
                      sbp.slice_del();
                    }
                  }
                }

                function r_e_ending() {
                  var v_1;
                  B_e_found = false;
                  sbp.ket = sbp.cursor;
                  if (sbp.eq_s_b(1, "e")) {
                    sbp.bra = sbp.cursor;
                    if (r_R1()) {
                      v_1 = sbp.limit - sbp.cursor;
                      if (sbp.out_grouping_b(g_v, 97, 232)) {
                        sbp.cursor = sbp.limit - v_1;
                        sbp.slice_del();
                        B_e_found = true;
                        r_undouble();
                      }
                    }
                  }
                }

                function r_en_ending() {
                  var v_1;
                  if (r_R1()) {
                    v_1 = sbp.limit - sbp.cursor;
                    if (sbp.out_grouping_b(g_v, 97, 232)) {
                      sbp.cursor = sbp.limit - v_1;
                      if (!sbp.eq_s_b(3, "gem")) {
                        sbp.cursor = sbp.limit - v_1;
                        sbp.slice_del();
                        r_undouble();
                      }
                    }
                  }
                }

                function r_standard_suffix() {
                  var among_var, v_1 = sbp.limit - sbp.cursor,
                      v_2, v_3, v_4, v_5, v_6;
                  sbp.ket = sbp.cursor;
                  among_var = sbp.find_among_b(a_3, 5);
                  if (among_var) {
                    sbp.bra = sbp.cursor;
                    switch (among_var) {
                      case 1:
                        if (r_R1())
                          sbp.slice_from("heid");
                        break;
                      case 2:
                        r_en_ending();
                        break;
                      case 3:
                        if (r_R1() && sbp.out_grouping_b(g_v_j, 97, 232))
                          sbp.slice_del();
                        break;
                    }
                  }
                  sbp.cursor = sbp.limit - v_1;
                  r_e_ending();
                  sbp.cursor = sbp.limit - v_1;
                  sbp.ket = sbp.cursor;
                  if (sbp.eq_s_b(4, "heid")) {
                    sbp.bra = sbp.cursor;
                    if (r_R2()) {
                      v_2 = sbp.limit - sbp.cursor;
                      if (!sbp.eq_s_b(1, "c")) {
                        sbp.cursor = sbp.limit - v_2;
                        sbp.slice_del();
                        sbp.ket = sbp.cursor;
                        if (sbp.eq_s_b(2, "en")) {
                          sbp.bra = sbp.cursor;
                          r_en_ending();
                        }
                      }
                    }
                  }
                  sbp.cursor = sbp.limit - v_1;
                  sbp.ket = sbp.cursor;
                  among_var = sbp.find_among_b(a_4, 6);
                  if (among_var) {
                    sbp.bra = sbp.cursor;
                    switch (among_var) {
                      case 1:
                        if (r_R2()) {
                          sbp.slice_del();
                          v_3 = sbp.limit - sbp.cursor;
                          sbp.ket = sbp.cursor;
                          if (sbp.eq_s_b(2, "ig")) {
                            sbp.bra = sbp.cursor;
                            if (r_R2()) {
                              v_4 = sbp.limit - sbp.cursor;
                              if (!sbp.eq_s_b(1, "e")) {
                                sbp.cursor = sbp.limit - v_4;
                                sbp.slice_del();
                                break;
                              }
                            }
                          }
                          sbp.cursor = sbp.limit - v_3;
                          r_undouble();
                        }
                        break;
                      case 2:
                        if (r_R2()) {
                          v_5 = sbp.limit - sbp.cursor;
                          if (!sbp.eq_s_b(1, "e")) {
                            sbp.cursor = sbp.limit - v_5;
                            sbp.slice_del();
                          }
                        }
                        break;
                      case 3:
                        if (r_R2()) {
                          sbp.slice_del();
                          r_e_ending();
                        }
                        break;
                      case 4:
                        if (r_R2())
                          sbp.slice_del();
                        break;
                      case 5:
                        if (r_R2() && B_e_found)
                          sbp.slice_del();
                        break;
                    }
                  }
                  sbp.cursor = sbp.limit - v_1;
                  if (sbp.out_grouping_b(g_v_I, 73, 232)) {
                    v_6 = sbp.limit - sbp.cursor;
                    if (sbp.find_among_b(a_5, 4) && sbp.out_grouping_b(g_v, 97, 232)) {
                      sbp.cursor = sbp.limit - v_6;
                      sbp.ket = sbp.cursor;
                      if (sbp.cursor > sbp.limit_backward) {
                        sbp.cursor--;
                        sbp.bra = sbp.cursor;
                        sbp.slice_del();
                      }
                    }
                  }
                }
                this.stem = function() {
                  var v_1 = sbp.cursor;
                  r_prelude();
                  sbp.cursor = v_1;
                  r_mark_regions();
                  sbp.limit_backward = v_1;
                  sbp.cursor = sbp.limit;
                  r_standard_suffix();
                  sbp.cursor = sbp.limit_backward;
                  r_postlude();
                  return true;
                }
              };

            /* and return a function that stems a word for the current locale */
            return function(token) {
                // for lunr version 2
                if (typeof token.update === "function") {
                    return token.update(function (word) {
                        st.setCurrent(word);
                        st.stem();
                        return st.getCurrent();
                    })
                } else { // for lunr version <= 1
                    st.setCurrent(token);
                    st.stem();
                    return st.getCurrent();
                }
            }
        })();

        lunr.Pipeline.registerFunction(lunr.kr.stemmer, 'stemmer-kr');

        lunr.kr.stopWordFilter = lunr.generateStopWordFilter('아 휴 아이구 아이쿠 아이고 어 나 우리 저희 따라 의해 을 를 에 의 가 으로 로 에게 뿐이다 의거하여 근거하여 입각하여 기준으로 예하면 예를 들면 예를 들자면 저 소인 소생 저희 지말고 하지마 하지마라 다른 물론 또한 그리고 비길수 없다 해서는 안된다 뿐만 아니라 만이 아니다 만은 아니다 막론하고 관계없이 그치지 않다 그러나 그런데 하지만 든간에 논하지 않다 따지지 않다 설사 비록 더라도 아니면 만 못하다 하는 편이 낫다 불문하고 향하여 향해서 향하다 쪽으로 틈타 이용하여 타다 오르다 제외하고 이 외에 이 밖에 하여야 비로소 한다면 몰라도 외에도 이곳 여기 부터 기점으로 따라서 할 생각이다 하려고하다 이리하여 그리하여 그렇게 함으로써 하지만 일때 할때 앞에서 중에서 보는데서 으로써 로써 까지 해야한다 일것이다 반드시 할줄알다 할수있다 할수있어 임에 틀림없다 한다면 등 등등 제 겨우 단지 다만 할뿐 딩동 댕그 대해서 대하여 대하면 훨씬 얼마나 얼마만큼 얼마큼 남짓 여 얼마간 약간 다소 좀 조금 다수 몇 얼마 지만 하물며 또한 그러나 그렇지만 하지만 이외에도 대해 말하자면 뿐이다 다음에 반대로 반대로 말하자면 이와 반대로 바꾸어서 말하면 바꾸어서 한다면 만약 그렇지않으면 까악 툭 딱 삐걱거리다 보드득 비걱거리다 꽈당 응당 해야한다 에 가서 각 각각 여러분 각종 각자 제각기 하도록하다 와 과 그러므로 그래서 고로 한 까닭에 하기 때문에 거니와 이지만 대하여 관하여 관한 과연 실로 아니나다를가 생각한대로 진짜로 한적이있다 하곤하였다 하 하하 허허 아하 거바 와 오 왜 어째서 무엇때문에 어찌 하겠는가 무슨 어디 어느곳 더군다나 하물며 더욱이는 어느때 언제 야 이봐 어이 여보시오 흐흐 흥 휴 헉헉 헐떡헐떡 영차 여차 어기여차 끙끙 아야 앗 아야 콸콸 졸졸 좍좍 뚝뚝 주룩주룩 솨 우르르 그래도 또 그리고 바꾸어말하면 바꾸어말하자면 혹은 혹시 답다 및 그에 따르는 때가 되어 즉 지든지 설령 가령 하더라도 할지라도 일지라도 지든지 몇 거의 하마터면 인젠 이젠 된바에야 된이상 만큼 어찌됏든 그위에 게다가 점에서 보아 비추어 보아 고려하면 하게될것이다 일것이다 비교적 좀 보다더 비하면 시키다 하게하다 할만하다 의해서 연이서 이어서 잇따라 뒤따라 뒤이어 결국 의지하여 기대여 통하여 자마자 더욱더 불구하고 얼마든지 마음대로 주저하지 않고 곧 즉시 바로 당장 하자마자 밖에 안된다 하면된다 그래 그렇지 요컨대 다시 말하자면 바꿔 말하면 즉 구체적으로 말하자면 시작하여 시초에 이상 허 헉 허걱 바와같이 해도좋다 해도된다 게다가 더구나 하물며 와르르 팍 퍽 펄렁 동안 이래 하고있었다 이었다 에서 로부터 까지 예하면 했어요 해요 함께 같이 더불어 마저 마저도 양자 모두 습니다 가까스로 하려고하다 즈음하여 다른 다른 방면으로 해봐요 습니까 했어요 말할것도 없고 무릎쓰고 개의치않고 하는것만 못하다 하는것이 낫다 매 매번 들 모 어느것 어느 로써 갖고말하자면 어디 어느쪽 어느것 어느해 어느 년도 라 해도 언젠가 어떤것 어느것 저기 저쪽 저것 그때 그럼 그러면 요만한걸 그래 그때 저것만큼 그저 이르기까지 할 줄 안다 할 힘이 있다 너 너희 당신 어찌 설마 차라리 할지언정 할지라도 할망정 할지언정 구토하다 게우다 토하다 메쓰겁다 옆사람 퉤 쳇 의거하여 근거하여 의해 따라 힘입어 그 다음 버금 두번째로 기타 첫번째로 나머지는 그중에서 견지에서 형식으로 쓰여 입장에서 위해서 단지 의해되다 하도록시키다 뿐만아니라 반대로 전후 전자 앞의것 잠시 잠깐 하면서 그렇지만 다음에 그러한즉 그런즉 남들 아무거나 어찌하든지 같다 비슷하다 예컨대 이럴정도로 어떻게 만약 만일 위에서 서술한바와같이 인 듯하다 하지 않는다면 만약에 무엇 무슨 어느 어떤 아래윗 조차 한데 그럼에도 불구하고 여전히 심지어 까지도 조차도 하지 않도록 않기 위하여 때 시각 무렵 시간 동안 어때 어떠한 하여금 네 예 우선 누구 누가 알겠는가 아무도 줄은모른다 줄은 몰랏다 하는 김에 겸사겸사 하는바 그런 까닭에 한 이유는 그러니 그러니까 때문에 그 너희 그들 너희들 타인 것 것들 너 위하여 공동으로 동시에 하기 위하여 어찌하여 무엇때문에 붕붕 윙윙 나 우리 엉엉 휘익 윙윙 오호 아하 어쨋든 만 못하다 하기보다는 차라리 하는 편이 낫다 흐흐 놀라다 상대적으로 말하자면 마치 아니라면 쉿 그렇지 않으면 그렇지 않다면 안 그러면 아니었다면 하든지 아니면 이라면 좋아 알았어 하는것도 그만이다 어쩔수 없다 하나 일 일반적으로 일단 한켠으로는 오자마자 이렇게되면 이와같다면 전부 한마디 한항목 근거로 하기에 아울러 하지 않도록 않기 위해서 이르기까지 이 되다 로 인하여 까닭으로 이유만으로 이로 인하여 그래서 이 때문에 그러므로 그런 까닭에 알 수 있다 결론을 낼 수 있다 으로 인하여 있다 어떤것 관계가 있다 관련이 있다 연관되다 어떤것들 에 대해 이리하여 그리하여 여부 하기보다는 하느니 하면 할수록 운운 이러이러하다 하구나 하도다 다시말하면 다음으로 에 있다 에 달려 있다 우리 우리들 오히려 하기는한데 어떻게 어떻해 어찌됏어 어때 어째서 본대로 자 이 이쪽 여기 이것 이번 이렇게말하자면 이런 이러한 이와 같은 요만큼 요만한 것 얼마 안 되는 것 이만큼 이 정도의 이렇게 많은 것 이와 같다 이때 이렇구나 것과 같이 끼익 삐걱 따위 와 같은 사람들 부류의 사람들 왜냐하면 중의하나 오직 오로지 에 한하다 하기만 하면 도착하다 까지 미치다 도달하다 정도에 이르다 할 지경이다 결과에 이르다 관해서는 여러분 하고 있다 한 후 혼자 자기 자기집 자신 우에 종합한것과같이 총적으로 보면 총적으로 말하면 총적으로 대로 하다 으로서 참 그만이다 할 따름이다 쿵 탕탕 쾅쾅 둥둥 봐 봐라 아이야 아니 와아 응 아이 참나 년 월 일 령 영 일 이 삼 사 오 육 륙 칠 팔 구 이천육 이천칠 이천팔 이천구 하나 둘 셋 넷 다섯 여섯 일곱 여덟 아홉 령 영'.split(' '));

        lunr.Pipeline.registerFunction(lunr.kr.stopWordFilter, 'stopWordFilter-kr');
    };
}))