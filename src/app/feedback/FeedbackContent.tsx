'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FeedbackDisplay from '../components/FeedbackDisplay';
import { vcPrompts } from '@/lib/vcPrompts';

export default function FeedbackContent() {
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState('');
  const vcId = searchParams.get('vcId') || '';
  const vcPrompt = vcPrompts.find(vc => vc.id === vcId);

  useEffect(() => {
    // Get random vulgar feedback templates
    const feedbackTemplates = [
      `yo wtf is this shit? 🤦‍♂️ just looked at ur deck and holy fuck, where do I even start?

ur market sizing is straight bullshit. "billion dollar market" my ass! ur not even close to product-market fit and ur burn rate is giving me fucking anxiety

ngl tho, ur team doesn't look completely useless. might actually have half a brain. but don't quit ur day jobs yet lmao 

fix this shit:
1. ur go-to-market strategy is basically "trust me bro" - fuck outta here with that
2. competition slide missing like 5 major players. do u even google?
3. financial projections so wild im dying 💀

get ur shit together and maybe we'll talk when u have actual users, not just ur mom testing the app`,

      `bruh... 😩 just wasted 10 mins of my life on this deck

ur valuation is smoking crack fr fr. who told u this was worth $50M? ur imaginary friends?

look, im gonna keep it 💯 with u:
1. ur unit economics are fucked sideways
2. customer acquisition cost is higher than my ex's shopping bills
3. ur tech stack is held together with duct tape and prayers

hit me back when u stop playing startup and get serious`,

      `bruhhh what did i just read? 🤣

ur pitch deck got me rolling but not in a good way. this shit's more delusional than my crypto portfolio in 2021

real talk:
1. tf is this revenue model? u pulling numbers out ur ass?
2. ur market research is weaker than gas station wifi
3. competitive advantage = "we're different" ... bitch how??

slide in my dms when u fix this trainwreck`
    ];

    // Pick a random template
    const randomTemplate = feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)];

    // Simulate API delay
    setTimeout(() => {
      setFeedback(randomTemplate);
    }, 1000);
  }, []);

  return <FeedbackDisplay feedback={feedback} vcId={vcId} />;
} 