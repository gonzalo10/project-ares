import tr from 'textrank';

module.exports = (req, res) => {
	var settings = {
		extractAmount: 1
	};
	var textRank = new tr.TextRank(textToSummary, settings);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(textRank));
};

const textToSummary = `Dear young man,
I hope this letter finds you in good health!
Today I write to you concerning a matter of grave urgency – YOU: your life, your potential, your future.
I want you to treat this letter as a warning – and it might be the only one you get, for the world may give you one until it’s too late.
I see that you have found yourself in a world that is seemingly full of endless pleasure and consumption. People all around you don’t seem to be concerned about anything of any importance, only dopamine hits.
I wish to protect you from the perils of going down this route and saving yourself the regrets of “I could have…”, however, for that, we need to set up the scene.
Let us start from the beginning.
A man is born with nothing but his potential.
His potential is a function of his genetics, his family, his fate, his country, his intelligence, his lifespan, etc.
Some men are unlucky; they are born with glaring defects in one or more of these traits – such as being born handicapped, or in a family so poor that he does not receive an education, or lacking in intellect – which we all know is an essential trait to grow in this modern world where intelligence is a prerequisite for success.
You, however, have managed to avoid this unfortunate fate, as you can read English, received an education, are rich enough to have a working internet connection, have all your limbs intact and functioning, and are intelligent enough to read this letter instead of celebrity gossip, which I’m told is far more glamorous.
However, potential isn’t everything.
You will find that many of your friends, who also received gifts as good as yours (with some variation of course), are wasting it all – they are consuming their future today.
They are enjoying themselves, but they are paying EVERYTHING for it – from their health and well being of their bodies (which you have to live with longer than you think), their finances and wealth (which is the cornerstone of a good life), and their time (the only truly perishable, most valuable, irrecoverable resource).
You, young man, like all young men, have lots of time and energy, and because you are not yet old, you feel that you will have plenty of time and energy forever.
When you feel that life is infinite, it makes sense that a man would take all the pleasure upfront, and do the work later, or never. That, however, we both know, is not true. You know you will grow older, your body will become weaker, and your mind will become slower.
Young man, consider the consequences of your actions beyond one day. There is more to life than the ten years of your 20s.
You also have to live your 30s and 40s and 50s and beyond, and it’s much harder to pay your dues then than it is to pay them when you are in your 20s. The price needs to be paid, you either pay it with pain today or both pain and regret tomorrow (and mind you, the interest rate is terrible).
When a man is young, he gets support from his parents, his family, and he even has many friends who are there for him – for that is the age with little responsibility and plenty of time.
When a man is older (say in his 30s and 40s) – the support is gone. No one thinks he has “potential” anymore. There are lots of things he has to be responsible for, and not enough free time to make up for all the lost foundation. At that point, you have created much of your life, for better or for worse.
Think of your time and energy and potential of your youth as your principal. You can invest it, or you can spend it.
When you as a young man, put your time, health, and money into pursuits of pleasure – be it consuming terrible food all the time, drinking alcohol, watching funny videos on YouTube and TikTok, chasing women who mean nothing, in other words, chasing cheap dopamine hits, you are SPENDING your principal.
When you put those very traits of yours into good use, building your body in the gym, keeping yourself in good health with exercise and good food, building a business or a career or both that will yield you money and wealth for the rest of your life, building your knowledge and wisdom via reading and learning and observation, and building skills that you can use and market, you are INVESTING your principal.
Both directions have the same beginnings, but they have very different destinations.
Let’s call the first one, the pleasure path, and the second one, the excellence path.
On the pleasure path, you consume what you have today. Instead of investing your principal, you spend it. You feel rich because you get to have everything TODAY.
However, as time goes on, your principal erodes in value, as your take from it more than you put in, and once the “fun period” (which usually ends in your late 20s to early 30s) is gone, you are left with nothing.
Nothing but a damaged body from all the years of neglect and lack of exercise, an impaired mind from years of drinking and drugs (if you chose to partake in those activities), average to little money for you never built any businesses and spent what you made and kept nothing for yourself, and little in terms of wisdom and knowledge for you read little and thus did not learn from the experiences of great men.
On the excellence path, you invest what you have today, and you receive the rewards later. You live like no one will so you can live like no one can. You will choose how you want to live your life, instead of being forced to live a certain way because of your bad circumstances.
You will have money to enjoy life, and good health to enjoy money, and a good mindset to enjoy your good health. The wisdom you gain over time will add up to make you a man to be reckoned with.
Dear young man, do not feel left out that you are not the one having all the fun today, for fun is not life, and all the fun people are having is temporary – until their principals run out, and then they are down to nothing. The hard path becomes the easy path down the line, and it makes you a hard man along the way.
To give you an analogy to the two paths I presented to you: imagine a man who has a great life, a great car, a great house, and all the goodies you’d like to have for yourself.
Now there are two ways to be this man – you could either simply borrow money to buy yourself a great life today, and spend much of your remaining life paying it back, or you could set up the foundations that will bring you the wealth you need to be that man, over time, of course.
The debt path would look glorious, for he will have everything right away, but once the time comes to pay the piper, to pay back the debt – would it still be as glorious? What will that man be then? A slave working for the loan company, and nothing more.
The latter path is HARD (and much of the hardness comes from being aware that the former path exists and the rewards are instant – the human mind is a fickle, a wild creature that only thinks in the short term unless strictly tamed with willpower) but it pays off over time, and it pays off a lot more than the former path.
Of course, every day, you get to make the choice about how you spend your time – do you take a step towards the pleasure path or the excellence path? Whatever you do, now that you have read my letter, you know what lies ahead – so you can no longer claim “I did not know” – for we all know, where we are headed.
It is to be noted that the world wants you to take the pleasure path. It wants you to enjoy yourself today so that it can own you tomorrow. Hell, your friends on the pleasure path want you to join them – they encourage and call out to you to get in with them.
People who are average in life are very dangerous – for they make you one of them very subtly. “Why work hard”, and “Just chill and relax” are their slogans, but they are not different than a heroin addict who tries to get their friends addicted so that they do not feel alone (or judged) in their addiction.
Average and ordinary people want everyone to be average and ordinary, lest they need to face reality later on. They play on your need for pleasure today, sometimes knowing full well that they’re doing you a disservice.
A lot of pleasure in your life will become available to you if you simply embody this message: “I don’t have any dreams (or I don’t care about them, or I give up); I only live to enjoy my days.” Of course, this is just a pyrrhic victory, for pleasure is fleeting, and the hedonistic treadmill is still running.
If you have no goals or dreams or ideals, it is very easy to think that you have “already arrived”, for you had nowhere to go, and since you have arrived, it’s time to party and celebrate. But when you arrive where you stood without moving, you haven’t gone far.
If you give up your dreams, you can have the fun, the fast food, the free time, the outings, the trips, the video games, the women, but it won’t last, and you will end up with nothing in your hands. Your ignorance will be bliss, till the time comes when you start to pay for it all – then it will turn into regret.
If you embrace your dreams, you can have it all, and it will be truly yours (not some loan company’s), and you will have your health and god’s will to allow you to enjoy them.
With this, I leave you to implore your choices and tread carefully, for every step and second is permanent, and the sands of time only fall downwards.
Your friend and well-wisher,
Harsh Strongman`;
