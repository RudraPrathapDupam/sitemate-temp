import { Router } from 'express';
import Issue, { validateIssue } from '../../models/Issue.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: 'desc' });

    res.json({
      issues: issues.map((issue) => {
        return issue.toJSON();
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ issue: 'No issue found.' });
    res.json({ issue: issue.toJSON() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.post('/', async (req, res) => {
  // const { error } = validateIssue(req.body);
  // if (error) return res.status(400).json({ issue: error.details[0].issue });
  console.log(req);

  try {
    let issue = await Issue.create({
      title: req.body.issue.title,
      descrition: req.body.issue.id,
    });
    issue = await issue.populate('user').populate();

    res.status(200).json({ issue: issue.toJSON() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ issue: 'Something went wrong.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log(req.params);
    const tempIssue = await Issue.findById(req.params.id);
    const issue = await Issue.findByIdAndRemove(req.params.id);
    if (!issue) return res.status(404).json({ issue: 'No issue found.' });
    res.status(200).json({ issue });
  } catch (err) {
    console.log(err);
    res.status(500).json({ issue: 'Something went wrong.' });
  }
});

router.put('/:id', async (req, res) => {
  // const { error } = validateIssue(req.body);
  // if (error) return res.status(400).json({ issue: error.details[0].issue });

  try {
    const tempIssue = await Issue.findById(req.params.id);
    console.log("found tempIssue to update: ",tempIssue);
    let issue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body.issueUpdate
    );
    console.log("updated Issue: ",issue)
    if (!issue) return res.status(404).json({ issue: 'No issue found.' });
    res.status(200).json({ issue });
  } catch (err) {
    console.log(err);
    res.status(500).json({ issue: 'Something went wrong.' });
  }
});

export default router;
