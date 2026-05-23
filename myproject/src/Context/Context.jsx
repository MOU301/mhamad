
import { createContext, useState,useEffect, useCallback } from "react";
import axiosInstance from "../API/Api";
import axios from "axios";
import { use } from "react";
import { GiElderberry } from "react-icons/gi";

const about=[
  {"text":[
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis beatae fugiat animi consectetur dolores vitae iusto? Iste aliquam quibusdam amet consequuntur quod voluptas aperiam, repudiandae magni deleniti quisquam doloremque sed.",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis beatae fugiat animi consectetur dolores vitae iusto? Iste aliquam quibusdam amet consequuntur quod voluptas ",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis beatae fugiat animi consectetur dolores vitae iusto? Iste aliquam quibusdam amet "
  ],
"image":"../../assets/test/about.jpeg"
},

]
// const views=[
//     {
//         "name":"Mohammad",
//         "view":"With supporting text below as a natural lead-in to additional content.",
//         "learn":["A1","A2","B1"]
//     },{
//         "name":"Sara",
//         "view":"With supporting text additional content.",
//         "learn":["A1"]  
//     },{
//         "name":"Motaz",
//         "view":"With supporting text additional content. and the techer is very goog ",
//         "learn":["A1","B2"]  
//     },{
//         "name":"Anna",
//         "view":"With supporting text additional content. and the video is simpall",
//         "learn":["A1","A2","B1"]       
//     }
// ]
// const myCouresData=[{
//   "id":1,
//   "bostter":"A1.jpg",
//   "title":"E A1",
//   "author":"momo",
//   "description":"the leher is sehr gut and er arbeit mit der lerhning meh 10 jahre alt so er war in deutschland",
//   "price":"20",
//   "lessons":[
//     {
//       "id":9,
//       "title":"vorstellen",
//       "number":1,
//        "lesson_data":[
//          {"id":0,
//            "type":"video",
//            "src":"../../../src/assets/test/test"
//        },
//        {
//        "id":1,
//        "type":"ubung1",
//        "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//        "ubung":['her','dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//    },{
//        "id":2,
//        "type":'ubung2',
//        'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//        "ubung":[0,1,0,0,1]
//    },{
//        "id":3,
//        "type":"audio",
//         "src":"../../../src/assets/test/test"
//    },
//    {    "id":3,
//        "type":"ubung3",
//        'text':['one','tow','three','four'],
//        'ubung':['one','tow','three','four']
//    },{
//        "id":4,
//        "type":"ubung4",
//        "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//        "ubung":["stift","buch","radiergummi","stuhl"]
//    },{
//        "id":5,
//      "type":"dialog",
//      "src":["dialog.jpg"],
//      "text":"Ahmad**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//    },{
//        "id":6,
//      "type":"dialog",
//      "src":["dialog.jpg"],
//      "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//    },{
//        "id":7,
//        "type":"summary",
//        "src":"../../../src/assets/test/summary.jpg"
//    }]
//    }
//   ]
//  },{"id":2,
//   "bostter":"A1.jpg",
//   "title":"E B1",
//   "author":"momo",
//   "description":"the leher is sehr gut and er arbeit mit der lerhning meh 10 jahre alt so er war in deutschland",
//   "price":"20",
//   "lessons":[
//     {
//       "id":7,
//       "title":"vorstellen",
//       "number":1,
//        "lesson_data":[
//          {"id":0,
//            "type":"video",
//            "src":"../../../src/assets/test/test"
//        },
//        {
//        "id":1,
//        "type":"ubung1",
//        "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//        "ubung":['her','dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//    },{
//        "id":2,
//        "type":'ubung2',
//        'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//        "ubung":[0,1,0,0,1]
//    },{
//        "id":3,
//        "type":"audio",
//         "src":"../../../src/assets/test/test"
//    },
//    {    "id":3,
//        "type":"ubung3",
//        'text':['one','tow','three','four'],
//        'ubung':['one','tow','three','four']
//    },{
//        "id":4,
//        "type":"ubung4",
//        "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//        "ubung":["stift","buch","radiergummi","stuhl"]
//    },{
//        "id":5,
//      "type":"dialog",
//      "src":["dialog.jpg"],
//      "text":"Ahmad**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//    },{
//        "id":6,
//      "type":"dialog",
//      "src":["dialog.jpg"],
//      "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//    },{
//        "id":7,
//        "type":"summary",
//        "src":"../../../src/assets/test/summary.jpg"
//    }]
//    }, {
//     "id":22,
//     "title":"vorstellen",
//     "number":2,
//      "lesson_data":[
//        {"id":0,
//          "type":"video",
//          "src":"../../../src/assets/test/test"
//      },
//      {
//      "id":1,
//      "type":"ubung1",
//      "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//      "ubung":['her','dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//  },{
//      "id":2,
//      "type":'ubung2',
//      'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//      "ubung":[0,1,0,0,1]
//  },{
//      "id":3,
//      "type":"audio",
//       "src":"../../../src/assets/test/test"
//  },
//  {    "id":3,
//      "type":"ubung3",
//      'text':['one','tow','three','four'],
//      'ubung':['one','tow','three','four']
//  },{
//      "id":4,
//      "type":"ubung4",
//      "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//      "ubung":["stift","buch","radiergummi","stuhl"]
//  },{
//      "id":5,
//    "type":"dialog",
//    "src":["dialog.jpg"],
//    "text":"Ahmad**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//  },{
//      "id":6,
//    "type":"dialog",
//    "src":["dialog.jpg"],
//    "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//  },{
//      "id":7,
//      "type":"summary",
//      "src":"../../../src/assets/test/summary.jpg"
//  }]
//  }
//   ]
//  }];
// const courses=[
//        {"id":5,
//         "bostter":"A1.jpg",
//         "title":"B1",
//         "author":"momo",
//         "description":"the leher is sehr gut and er arbeit mit der lerhning meh 10 jahre alt so er war in deutschland",
//         "price":"20",
//         "lessons":[
//           { 
//             "id":10,
//             "title":"vorstellen",
//             "number":1,
//              "lesson_data":[
//                {"id":0,
//                  "type":"video",
//                  "src":"../../../src/assets/test/test"
//              },
//              {
//              "id":1,
//              "type":"ubung1",
//              "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//              "ubung":['her','dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//          },{
//              "id":2,
//              "type":'ubung2',
//              'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//              "ubung":[0,1,0,0,1]
//          },{
//              "id":3,
//              "type":"audio",
//               "src":"../../../src/assets/test/test"
//          },
//          {    "id":3,
//              "type":"ubung3",
//              'text':['one','tow','three','four'],
//              'ubung':['one','tow','three','four']
//          },{
//              "id":4,
//              "type":"ubung4",
//              "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//              "ubung":["stift","buch","radiergummi","stuhl"]
//          },{
//              "id":5,
//            "type":"dialog",
//            "src":["dialog.jpg"],
//            "text":"Ahmad**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//          },{
//              "id":6,
//            "type":"dialog",
//            "src":["dialog.jpg"],
//            "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//          },{
//              "id":7,
//              "type":"summary",
//              "src":"../../../src/assets/test/summary.jpg"
//          }]
//          }, { 
//           "id":11,
//           "title":"vorstellen",
//           "number":1,
//            "lesson_data":[
//              {"id":0,
//                "type":"video",
//                "src":"../../../src/assets/test/test"
//            },
//            {
//            "id":1,
//            "type":"filltext",
//            "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//            "ubung":['her','dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//        },{
//            "id":2,
//            "type":'trueandfalse',
//            'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//            "ubung":[0,1,0,0,1]
//        },{
//            "id":3,
//            "type":"audio",
//             "src":"../../../src/assets/test/test"
//        },
//        {    "id":3,
//            "type":"questionadnansur",
//            'text':['one','tow','three','four'],
//            'ubung':['one','tow','three','four']
//        },{
//            "id":4,
//            "type":"fillwithimage",
//            "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//            "ubung":["stift","buch","radiergummi","stuhl"]
//        },{
//            "id":5,
//          "type":"dialog",
//          "src":["dialog.jpg"],
//          "text":"Ahmad**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//        },{
//            "id":6,
//          "type":"dialog",
//          "src":["dialog.jpg"],
//          "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//        },{
//            "id":7,
//            "type":"summary",
//            "src":"../../../src/assets/test/summary.jpg"
//        }]
//        }
//         ]
//        },{"id":6,
//         "bostter":"A1.jpg",
//         "title":"A1",
//         "author":"momo",
//         "description":"the leher is sehr gut and er arbeit mit der lerhning meh 10 jahre alt so er war in deutschland",
//         "price":"20",
//         "lessons":[
//           {
//             "id":20,
//             "title":"vorstellen",
//             "number":1,
//              "lesson_data":[
//                {"id":0,
//                  "type":"video",
//                  "src":"../../../src/assets/test/test"
//              },
//              {
//              "id":1,
//              "type":"filltext",
//              "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//              "ubung":['her','dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//          },{
//              "id":2,
//              "type":'trueandfalse',
//              'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//              "ubung":[0,1,0,0,1]
//          },{
//              "id":3,
//              "type":"audio",
//               "src":"../../../src/assets/test/test"
//          },
//          {    "id":3,
//              "type":"questionandansur",
//              'text':['one','tow','three','four'],
//              'ubung':['one','tow','three','four']
//          },{
//              "id":4,
//              "type":"fillwithimage",
//              "src":["stift.jpg","buch.jpg","radiergummi.jpg","stuhl.jpg"],
//              "ubung":["stift","buch","radiergummi","stuhl"]
//          },{
//              "id":5,
//            "type":"dialog",
//            "src":["dialog.jpg"],
//            "text":"Ahmad**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//          },{
//              "id":6,
//            "type":"dialog",
//            "src":["dialog.jpg"],
//            "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"
//          },{
//              "id":7,
//              "type":"summary",
//              "src":"../../../src/assets/test/summary.jpg"
//          }]
//          }
//         ]
//        }
 
// ]
//  Grammatik:Grammatik,

  // Dialog:Dialog,




  // Audio:Audio,
  // Summary:Fassung,
  // WriteSentence:WriteSentence,
  // Image:Images,
  // Choice:Choice,
  // LessonText:LessonText
// const dataTest=[
//   {
//        "id":1,
//        "data":[
//         {
//           "id":8,
//           "type":"audio",
//           "src":'<iframe width="560" height="315" src="https://www.youtube.com/embed/ThfzV6MfEHM?si=iiVsFyUZkskuEANR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
//         },
//         {
//           "id":7,
//           "type":"choice",
//           "choice":[{"ask":"one is","ansur":["1","2","3"],"correct":0},{"ask":"tow is","ansur":["1","2","3"],"correct":1}]
//         },
//          {
//          "id":6,
//           "type":"writeSentence",
//           "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit ",
//           "ansur":["one","tow","three","four"],
             
//         },
//         {
//          "id":5,
//           "type":"fillWithImage",
//           "ansur":["stift","stuhl","radiergummi","buch"],
//            "src":["stift.jpg","stuhl.jpg","radiergummi.jpg","buch.jpg"]

           
//         },
//         {
//          "id":4,
//          "type":"Dialog",
//          "src":null,
//           "text":"Ahmad222**Anna, kommst du eigentlich aus Deutschland?**Anna**Ja, ich bin hier aufgewachsen, aber geboren bin ich in Russland. Meine Eltern sind von Sankt Petersburg nach Hamburg gezogen, als ich sehr klein war.**Ahmad**Interessant. Wie alt warst du damals?**Anna**Drei Jahre und zehn Monate, also fast vier.**Ahmad**Und kannst du dich an die Zeit in Russland erinnern?**Anna**Nicht wirklich. Ich habe fast alles vergessen.**Ahmad**Das ist schade! Aber du sprichst Russisch, oder?**Anna**Ja, zu Hause haben meine Eltern immer Russisch gesprochen. Also habe ich das auch gelernt. Mein Deutsch ist aber viel besser.**Ahmad**Wieso denn das? Russisch ist doch deine Muttersprache.**Anna**Ja, schon, aber ich bin in Deutschland zur Schule gegangen und studiere jetzt in Leipzig an der Universität. Russisch spreche ich nur in der Freizeit mit Verwandten und Freunden. Viele Wörter kenne ich aber nur auf Deutsch. Deshalb kann ich mich über schwierige Themen in dieser Sprache besser unterhalten.**Ahmad**Das kann ich verstehen. Ich bin nämlich auch zweisprachig aufgewachsen.**Anna**Echt? Das wusste ich gar nicht.**Ahmad**Ja, aber das erzähle ich dir ein anderes Mal. Jetzt muss ich los.**Anna**Alles klar. Dann bis später!"

//         },

//              {
//              "id":1,
//              "type":"FillText",
//              "text":"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis laborum temporibus eveniet, iusto, *** modi fugit enim reiciendis *** deserunt *** facilis quaerat aspernatur *** pariatur sunt *** magni, perferendis laboriosam hic. Enim quos, reprehenderit temporibus laudantium mollitia error facere,*** vero voluptatibus sed *** asperiores eos porro debitis rerum *** doloremque qui labore quis.",
//              "ansur":['dir','sir','fir','sir','mir','ihr','uns','dich','sich','mir']
//          }
//          ,{
//              "id":2,
//              "type":'TrueAndFalse',
//              'text':["how are you ?","how are you","how are you ?","wie alt bist du ?","lebst du mich ?"],
//              "ansur":[0,1,0,0,1]
//          }  ,
//          {    "id":3,
//              "type":"QuestionAndAnsur",
//              'text':['one','tow','three','four'],
//              'ansur':['one','tow','three','four']
//          }
//         ]
//   }
// ]
export const Context=createContext(null);
const ContextProvider=({children})=>{
    const [myCourses,setMyCourses]=useState([]);
    const [course,setCourse]=useState([]);
    const [lists,setLists]=useState([]);
    const [FR,setFR]=useState([]);
    const [show,setShow]=useState(false);
    const [mach,setMach]=useState(false);
    const [num,setNum]=useState(null)
    const [next,setNext]=useState(null);
    // const [prev,setPrev]=useState();
    const [unterricht,setUnterricht]=useState([]);
    const [ids,setIds]=useState([]);
    const [login,setLogin]=useState(false); 
    const [pathName,setPathName]=useState('/');
    const [finsh,setFinsh]=useState();
    const [lessons,setLessons]=useState([]);
    const [lessonData,setLessonData]=useState([]);
    const [ended,setEnded]=useState(null);

    const [message,setMessage]=useState('');
    const [views,setViews]=useState([]);
    const [courses,setCourses]=useState([]);
    const [myCouresData,setMyCoursesData]=useState([]);
    const [maincarousel,setMaincarousel]=useState([]);
   const [coursesCopy,setCoursesCopy]=useState([]);
    const [userInfo,setUserInfo]=useState(null);
    const [word,setWord]=useState('');
    const [update,setUpdate]=useState(false);
  const [sendView,setSendView]=useState(false);
    const [loading,setLoading]=useState(true);
    //test
    const [dataTest,setDataTest]=useState([]);
    const [point,setPoint]=useState(0)
    const [test_id,setTest_id]=useState(null);
    const [fertig,setFertig]=useState(false)
     const [ansurTest,setAnsurTest]=useState(null)
     const [click,setClick]=useState(false)
     const [resultTest,setResultTest]=useState([]);
     const [courseId,setCourseId]=useState(null)
    const [idLessonTest,setIdLessonTest]=useState(null);
    const [registerInfo,setRegisterInfo]=useState(null);
    const [timerState,setTimerState]=useState(true);
    const [wieder,setWieder]=useState(false);
    const [mustId,setMustId]=useState(null)
    const [old,setOld]=useState(false);
    // const Uapi='https://api.foryoulearn.com';
    // const Uadmin='https://admin.foryoulearn.com';
    // const Usuper='https://super.foryoulearn.com';
     const Uapi='http://api.foryou.local';
    const Uadmin='http://admin.foryou.local';
    const Usuper='http://super.foryou.local';
    axios.defaults.withCredentials = true;

    //get the data from database 
    //built function to shaffel the data


  let shaffel=(arr)=>{
        let newArr=[];
        switch (arr.length){
            case 2 :  
             newArr= [1,0];
             break;
            case 3 :
             newArr= [2,0,1];
               break ;
            case 4  : 
             newArr= [3,0,2,1];
               break;
             case 5 : 
             newArr= [3,0,4,1,2] ;
             break;
             case 6 : 
             newArr= [3,0,5,4,1,2];
             break; 
             case 7 : 
             newArr= [3,6,5,1,2,0,4];
             break; 
             case 8 : 
             newArr= [6,0,5,7,2,3,4,1];
             break; 
             case 9 : 
             newArr= [6,5,8,7,2,3,4,1,0];
             break;
             case 10 :
              newArr= [6,5,9,8,7,2,3,4,1,0];
              break;
              default :
              newArr=arr.slice().reverse()
            }
            return newArr;
  }
  let pos=(item)=>{
    //ich muss gebe id from back end to item from database id manual
     //push the item in posi
      return unterricht.indexOf(item);  
  }
   const getData=async()=>{
  
      return await axiosInstance.get(`/api/start`);
      }
     const getmycourses=async ()=>{
      
      
      return await axios.get(`${Uapi}/api/mycourses`,
        {withCredentials: true });
     }
const checkLogin = async () => {
 return await axiosInstance.get(`/api/user`)
}
// start logout

    useEffect(()=>{
      getData()
      .then(res=>{
               
            setMaincarousel(res.data.data.slider)
            setCourses(res.data.data.courses)
            setViews(res.data.data.views);  
            
      }).catch(error=>{})
      checkLogin().then(res => {
    setUserInfo(res.data);
    setLogin(true)
  })
  .catch(() => {
    setUserInfo(null);
    setLogin(false);
  }); 
    },[]);

useEffect(()=>{

  setCoursesCopy([...courses])
},[courses.length])

useEffect(()=>{
     if(userInfo!=null || update){
       
          getmycourses().then(res=>{
 
          
          setMyCoursesData(res.data.data);
        
          }).catch(error=>{});
     }
     setUpdate(false)
   },[userInfo,update]);

   useEffect(()=>{

    if(myCouresData.length>0 || update){

      const mycoursesId=myCouresData.map(item=>item.id);
      const coursesfilter=courses.filter(item=>!mycoursesId.includes(item.id));
      setCoursesCopy(coursesfilter)
 
    }else{
      setCoursesCopy([...courses])
    }
    setLoading(false)
   },[myCouresData,update])
 
    useEffect(()=>{

      if(course.length>0 && course[0].lessons.length>0){
        setLessons(course[0].lessons);

        setDataTest(course[0].tests);
        setTest_id(course[0].tests[0]?.id || null);
        if(course[0].tests.length>0){
          setMustId(course[0].tests[0].id)
        }else{
          setMustId(course[0].lessons[course[0].lessons.length-1].id)
        }
        
       
      }
    },[course,update]);     

const meakUnterrichtArr = (data, type) => {

  if (type === "lesson") {
    if (data.length > 0) {

      // Prepare everything BEFORE updating state
      const unterrichtArray = data.map(item =>
        `<${item.type[0].toUpperCase() + item.type.slice(1)} id={id}/>`
      );

      const idsArray = data.map(item => item.number);

      const lastNumber = data[data.length - 1].number;

      // Update state ONCE
      setUnterricht(unterrichtArray);
      setIds(idsArray);
      setNum(lastNumber);
      setFinsh(lastNumber);

    } else {
      // reset everything
      setUnterricht([]);
      setNum(0);
      setFinsh(0);
      setIds([]);
    }

  } else {
    // ------------------------------------
    // NORMAL DATA (sort by ID)
    // ------------------------------------
    if (data.length > 0) {
      const sorted = [...data].sort((a, b) => a.id - b.id);

      const unterrichtArray = sorted.map(item =>
        `<${item.type[0].toUpperCase() + item.type.slice(1)} id={id} type={test}/>`
      );

      const idsArray = sorted.map(item => item.id);

      setUnterricht(unterrichtArray);
      setIds(idsArray);

    } else {
      setUnterricht([]);
      setIds([]);
    }
  }
};
useEffect(()=>{
 
},[unterricht])

 useEffect(()=>{

 meakUnterrichtArr(lessonData,'lesson')
},[lessonData])

const checkView=async()=>{
 return await axiosInstance.get(`/api/checkView`); 
}
useEffect(()=>{
  
  if(myCouresData.length>0){
  checkView().then(res=>{

   if(!res.data.message){
    setSendView(true);
   } 
  }).catch(error=>{})
  }
 

},[myCouresData.length])
const translate=(e)=>{
          setWord(e.target.innerText);
      }
      const spaning=(textTranslate)=>{
          return textTranslate.split(' ').map((item,index)=><span key={index} className='text' onClick={(e)=>translate(e)}>{item} </span>);
      }
const refreshCourse=async()=>{
  
   getmycourses().then(res=>{

          setMyCoursesData(res.data.data);
        
    }).catch(error=>{});
}



const values={
  maincarousel,views,about,
  userInfo,ids,pos,unterricht,shaffel,FR,setFR
  ,show,setShow,mach,setMach,next,
  setNext,num,login,setLogin ,
  pathName,setPathName,lists,setLists,myCourses,myCouresData,setMyCoursesData,courses,
  finsh,setCourse,lessons,setFinsh,lessonData,setLessonData,
  userInfo,setUserInfo,message,setMessage,
  coursesCopy,setCoursesCopy,
  word,setWord,spaning,loading,update,setUpdate,
  Uapi,Uadmin,Usuper,sendView,setSendView,
  registerInfo,setRegisterInfo,refreshCourse,point,setPoint
  ,dataTest,meakUnterrichtArr,test_id,setTest_id,fertig,setFertig
  ,ansurTest,setAnsurTest,click,setClick,
  resultTest,setResultTest,
  setCourseId,courseId,timerState,setTimerState,
  idLessonTest,setIdLessonTest,setLessons,setDataTest,
  wieder,setWieder,mustId,setMustId,old,setOld,
  ended,setEnded

}

    return (<Context.Provider value={values}>{children}</Context.Provider>)
}
export default ContextProvider;