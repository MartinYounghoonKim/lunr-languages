module.exports = {
  fields: [
    {
      name: 'title',
      config: { boost: 10 }
    }, {
      name: 'body'
    }
  ],
  documents: [
    {
      "title": "테스트",
      "body": "이것은 테스트 데이터입니다.",
      "id": 1
    }, {
      "title": "이게 되려나?",
      "body": "왠지 안될 것 같은데 테스트 겸 해서 한번 돌려보도록 하겠습니다.",
      "id": 2
    }
  ],
  tests: [
    {
      what: "find the word %w",
      search: "뭔데이게",
      found: 2
    }, {
      what: "find the word %w",
      search: "짱나네",
      found: 1
    }, {
      what: "never find a word that does not exist, like %w",
      search: "화가난다.",
      found: 0
    }, {
      what: "find a correctly stemmed word %w",
      search: "이건뭔데",
      found: 1
    }
  ]
}