"use strict";

{
  "story": [
    {
      "title": "start",
      "description": "x",
      "answers": [
        {
          "title": "path A",
          "id": "AStart",
          "description": "x",
          "over": false,
          "answers": [
            {
              "title": "path A end fail",
              "id": "A1Fail",
              "description": "x",
              "over": true,
              "win": false
            },
            {
              "title": "path A step 2 continue",
              "id": "A1Pass",
              "description": "x",
              "over": false,
              "answers": [
                {
                  "title": "path A step 2 fail",
                  "id": "A2Fail",
                  "description": "x",
                  "over": true,
                  "win": false
                },
                {
                  "title": "path A step 3 win",
                  "id": "A2Pass",
                  "description": "x",
                  "over": true,
                  "win": true
                }
              ]
            }
          ]
        },
        {
          "title": "path B",
          "id": "BStart",
          "description": "x",
          "over": false,
          "answers": [
            {
              "title": "path B end fail",
              "id": "B1Fail",
              "description": "x",
              "over": true,
              "win": false
            },
            {
              "title": "path B step 2 continue",
              "id": "B1Pass",
              "description": "x",
              "over": false,
              "answers": [
                {
                  "title": "path B step 2 fail",
                  "id": "B2Fail",
                  "description": "x",
                  "over": true,
                  "win": false
                },
                {
                  "title": "path B step 3 win",
                  "id": "B2Pass",
                  "description": "x",
                  "over": true,
                  "win": true
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}