<h2 align="center"> TTRPCompanion </h2>

![ttrpc-brand-2](https://github.com/knlrvr/ttrpg-char-stats-v2/assets/91632194/d567f93b-5135-47a8-a6f9-eba00e26fc58)


## Table of Contents
- [Releases](#releases)
- [Description](#description)
- [The Future of TTRPCompanion](#the-future-of-ttrpcompanion)
- [Purpose](#purpose)
- [View](#view)
- [Built With](#built-with)
- [Gallery](#gallery)
- [Notes](#notes)
- [Acknowledgements](#acknowledgements)

<a name="releases"></a>
## Releases
![v1.0.0](https://img.shields.io/badge/version-1.0.0-38bdf8) ![date](https://img.shields.io/badge/Aug_7_2023-informational) ![description](https://img.shields.io/badge/Initial_Release_+_How_To_Use-grey)
> Users must sign in via Google. Users signing in for the first time, or users who have not created any campaigns, will see a prompt to `create` or `select` a campaign in order to view character stats. Once a campaign has been created, two default campaign totals will appear, `total sessions` and `time played`. These will default to 0. There will also be an expandable form to create a character & input any stats. Once a character has been created, there are 6 more campaign totals, displayed in doughnut charts reflecting each character, that will render conditionally depending on the values provided for the character. (For example, if total damage dealt for each character is 0, no chart will display. If only one character has dealt damage, only their stat will appear.) All character information can be updated as needed via the `edit` button on the bottom of the character cards. Any updated values, or new entries, will reflect immediately within the conditionally rendered campaign totals. Users may deleted characters or campaigns as needed. If users have no campaigns, they will be prompted to create one. 

![v1.0.1](https://img.shields.io/badge/version-1.0.1-success) ![date](https://img.shields.io/badge/Aug_29_2023-informational) ![description](https://img.shields.io/badge/Login_Updates-grey)
> Users may now sign in via Discord.

![v2.0.0](https://img.shields.io/badge/version-2.0.0-fb923c) ![date](https://img.shields.io/badge/Sep_14_2023-informational) ![description](https://img.shields.io/badge/App_Overhaul_&_Function_Updates-grey)
> Complete design overhaul. Added total players to default campaign stats. Users will now create characters under the `Characters` tab and assign them to campaigns after creation. When assigned to a campaign, the character is removed from the `Characters` tab and placed into the chosen `Campaign`, which they can then view in the `Campaigns` tab. Users can also remove characters from campaigns, which will place them back in their `Characters` tab. Characters under the `Characters` tab are considered inactive since they're not associated with a campaign, but you can still edit their information and view them as you would if they were associated with a campaign.

![v2.0.1](https://img.shields.io/badge/version-2.0.1-0d9488) ![date](https://img.shields.io/badge/Sep_19_2023-informational) ![description](https://img.shields.io/badge/UI_Updates-grey)
> Users can now join campaigns using the `campaign code` provided at the bottom of each campaign. When users enter this campaign code on the campaign selector modal, the campaign will populate in their `campaigns` list. All campaign `participants` are now listed at the bottom of each campaign, including the `owner` and any `member` that has joined via code.

![v2.0.2](https://img.shields.io/badge/version-2.0.2-facc15) ![date](https://img.shields.io/badge/Sep_20_2023-informational) ![description](https://img.shields.io/badge/Function_Updates-grey)
> Introduced quest tracking. `Quests` take in a title, type, body, assigner, and reward (gold or other). When a quest is completed, it can be marked completed, removing it from the campaign. Introduced toast notifications for successful actions that reiterate the action performed.
> 
> ![bugs](https://img.shields.io/badge/Bugs-grey)  
> When a character is updated from the campaign screen, the action *is* performed, but the results of the action do not render unless you navigate away from the page, or reload. This bug *will* be removed before the next version. 

![v2.0.3](https://img.shields.io/badge/version-2.0.2-f87171) ![date](https://img.shields.io/badge/Oct_24_2023-informational) ![description](https://img.shields.io/badge/Styling_Updates_&_Function_Updates-grey)
> Minor styling adjustments, mostly related to the `profile` page and the `quests` component on the `campaigns` page. `V2.0.2 Bug` has successfully been removed. When saving updated character stats within a campaign, changes are immediately reflected. 

<a name="description"></a>
## Description
TTRPCompanion is a gaming utility app that allows users to track their character's stats in D&D Campaigns. Typically, other tools carry on the basic stats of characters, while TTRPCompanion allows users to track stats that blur the lines between player & character. These stats include total sessions, total time played, total damage dealt, & more! TTRPCompanion allows you to immerse yourself in your own gameplay, without taking you away from your character.


<a name="the-future-of-ttrpcompanion"></a>
## The Future of TTRPCompanion
As the number of users grows, I will do my best to accomodate any suggestions for this app! Feel free to reach out with any comments or suggestions for any features you'd like to see! 

![description](https://img.shields.io/badge/Upcoming_Features-grey)
> - Assign campaign members to populated characters
> - In-game time tracking
> - & more! Please stay tuned! 


<a name="purpose"></a>
## Purpose
With the rise of D&D's popularity, tools like D&DBeyond are incredibly reliable in tracking typical character stats like strength & dexterity, or proficiencies and languages. They track stats specific to who, why and what your character is, but they don't have any tools for tracking game related stats, like total Nat 20's rolled or total sessions played, or other character specific stats like total damage dealt, or total time in combat. I think it's important to have tools that bridge the gap between you and your character. So I made one. 


<a name="view"></a>
## View
[View Live](https://ttrpcompanion.vercel.app/)


<a name="built-with"></a>
## Built With
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/) [![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/) [![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/docs/installation) [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/) [![tRPC](https://img.shields.io/badge/trpc-blue.svg?style=for-the-badge&logoColor=white)](https://trpc.io/docs/quickstart) [![NextAuth](https://img.shields.io/badge/NextAuth-black.svg?style=for-the-badge&logoColor=white)](https://next-auth.js.org/) [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/) [![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)](https://playwright.dev/docs/intro)


<a name="gallery"></a>
## Gallery
> to be updated
>

<a name="notes"></a>
## Notes
> TTRPCompanion is currently undergoing a massive redo in design & functionality. The first look into this is available in v2.0, with MUCH more to come. Stay tuned!

<a name="acknowledgements"></a>
## Acknowledgements
> A massive shout out and thanks to everyone who is testing the app, giving great feedback, and helping to make this something more than some portfolio project. 
