var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { LeafPoll } from 'react-leaf-polls';
import 'react-leaf-polls/dist/index.css';
import { getSP } from '../../pnpConfig';
import "@pnp/sp/site-users/web";
import './PollElement.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';
var PollElement = function (props) {
    var _a = React.useState(true), isLoading = _a[0], setLoading = _a[1];
    var _b = React.useState(true), userVoted = _b[0], setUservoted = _b[1];
    var rowId = props.data.ID;
    var q = props.data.QuestionName;
    var c = props.data.Choices;
    var qid = String(props.data.QuestionId);
    var choicearr = JSON.parse(c);
    var userarrr = [];
    // Object keys may vary on the poll type (see the 'Theme options' table below)
    var customTheme = {
        textColor: 'black',
        mainColor: '#00B87B',
        backgroundColor: 'rgb(255,255,255)',
        alignment: 'left'
    };
    var checkUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _sp, user, list, cond;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _sp = getSP(new WebPartContext());
                    return [4 /*yield*/, _sp.web.currentUser()];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, _sp.web.lists.getByTitle("pollItems").items.select()()];
                case 2:
                    list = _a.sent();
                    list.map(function (x) {
                        userarrr.push(x.Email, String(x.qid));
                    });
                    console.log(userarrr.includes(user.Email));
                    cond = (userarrr.includes(user.Email) && userarrr.includes(qid));
                    setUservoted(cond);
                    setLoading(false);
                    return [2 /*return*/, user.Email];
            }
        });
    }); };
    var updateVotes = function (itm, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _sp, list, user, userEmail, iar, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _sp = getSP(props.context);
                    return [4 /*yield*/, _sp.web.lists.getByTitle("OpinionPole")];
                case 1:
                    list = _a.sent();
                    return [4 /*yield*/, _sp.web.currentUser()];
                case 2:
                    user = _a.sent();
                    userEmail = user.Email;
                    return [4 /*yield*/, _sp.web.lists.getByTitle("pollItems").items.add({
                            Title: "PollItem",
                            Item: JSON.stringify(itm),
                            Email: userEmail,
                            qid: qid
                        })];
                case 3:
                    iar = _a.sent();
                    return [4 /*yield*/, list.items.getById(rowId).update({
                            Title: "My New Title",
                            Choices: JSON.stringify(res)
                        })];
                case 4:
                    i = _a.sent();
                    console.log(i);
                    console.log(iar);
                    return [2 /*return*/];
            }
        });
    }); };
    function vote(item, results) {
        updateVotes(item, results);
    }
    React.useEffect(function () {
        checkUser();
    }, []);
    if (isLoading) {
        return React.createElement("div", { className: 'opinion' },
            React.createElement("label", { className: 'pollques' }, props.data.QuestionName), choicearr === null || choicearr === void 0 ? void 0 :
            choicearr.map(function (x) {
                return React.createElement("button", { className: 'pollbtn' }, x.text);
            }));
    }
    return (React.createElement("div", { className: 'PoleClass' },
        React.createElement(LeafPoll, { type: 'multiple', question: q, results: choicearr, theme: customTheme, onVote: vote, isVoted: userVoted })));
};
export default PollElement;
//# sourceMappingURL=PollElement.js.map