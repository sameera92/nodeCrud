const express = require('express');
const router = express.Router();

const user = require('./user');
const vote = require('./vote');
const category = require('./category');
const contestant = require('./contestant');
const webVote = require('./web_vote');
const smsVote = require('./sms_vote');
const adminUsers = require('./admin_users');
const smsLogs = require('./sms_logs');

router.post('/user/login', user.login);
router.post('/protected/user', user.profile);
router.get('/protected/category', category.get);
router.get('/protected/category/getById/:id', category.getById);
router.get('/protected/contestant/getall/:cat_id', contestant.getByCategory);
router.post('/protected/webVote', vote.web_vote);
router.get('/protected/webvote/:code', webVote.voteByUser);

router.get('/vote/receive_sms', vote.receive_sms);

router.post('/adminuser/create', adminUsers.create);
router.post('/adminuser/login', adminUsers.login);
router.get('/au/dashboard/getvotes', webVote.getTotVotes);
router.get('/au/dashboard/getvotescsv', webVote.getTotVotesCsv);
router.get('/au/dashboard/getvotes/:cat_id', webVote.getTotVotes);
router.get('/au/category', category.get);

router.get('/au/dashboard/web_report/:cat_id/:con_id/:offset/:limit', webVote.get);

router.get('/adminuser/testpage', webVote.testpage);
router.get('/adminuser/sms_report', smsVote.get);
router.get('/adminuser/sugesstions', smsLogs.get);




module.exports = router;