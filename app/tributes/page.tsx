"use client"
import { ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Tribute {
    id: number
    name: string
    relationship: string
    message: React.ReactNode // Changed from string
}

const tributes: Tribute[] = [
    {
        id: 1,
        name: "James Pamnia",
        relationship: "Consulting Historian, Administrator and Knowledge Entrepreneur, Abuja- Nigeria",
        message: (
            <>
                <p>
                    Today, we celebrate and immortalize the life of a woman whose name deserves to be etched in gold across the chronicles of Nigerian history—Mrs. Nancy Nenne Nadah, née Leha. In her, we saw the convergence of quiet strength and towering impact, an enigma wrapped in dignity, intellect, and indomitable grace.
                </p>
                <p>
                    Born in 1943 into the revered Mayah subnationality, she embodied the nobility of her heritage with humility and purpose. She would go on to marry into the illustrious Bwatiye nation of the Numan Federation, forging a union not just of hearts, but of histories, values, and futures. Together, these two cultural rivers flowed through her life's work—raising families, building institutions, and shaping communities.
                </p>
                <p>
                    A proud alumna of the prestigious Ahmadu Bello University, Mrs. Nadah was a trailblazer before the word became fashionable. Her journey began in the missionary education system, and continued with an unbroken line of distinguished service across North-Eastern Nigeria, through the defunct Gongola State, and into the present Adamawa State and Federal Government. Her career was a towering monument to excellence.
                </p>
                <p>
                    She served as a teacher in the once-revered Women Teachers Colleges of Azare and Numan—institutions which, in their time, rivaled today's top universities in quality and prestige. From there, she rose to become State Librarian and later Librarian of the Gongola State House of Assembly, culminating in her retirement as a Director at the National Library of Nigeria—a post she held with vision, diligence, and unassailable integrity.
                </p>
                <p>
                    But beyond the titles, beyond the accolades, was a Silent Amazon—a woman of strength who made no noise, yet shook mountains. She was the quiet architect behind the development of education and literacy across multiple generations. She mentored with intention, employed with compassion, and lifted countless families across Northern Nigeria into opportunity and dignity.
                </p>
                <p>
                    To describe her merely as a civil servant would be to miss the essence of her calling. She was a nation-builder, one of the unseen midwives of Gongola State, and a revered mother of Adamawa State. In every policy she shaped, every child she taught, and every life she touched, she sowed the seeds of enlightenment and progress.
                </p>
                <p>
                    As a mother and matriarch, she was nothing short of a Mother in Israel. Her home was a sanctuary, not only to her biological children but to countless others she embraced as her own. From the heartlands of the Numan Federation to the far reaches of Southern Nigeria, children rose and called her blessed; families found refuge in her warmth and wisdom; her husband, a partner in strength, praised her in the spirit of Proverbs 31.
                </p>
                <p>
                    Her leadership extended far beyond bureaucracy. She was a pillar of the community, a guiding light for the Maya and Bwatiye peoples. She stood as a woman of valor, who empowered not just her kin, but an entire generation of women and men who saw in her a mirror of what was possible.
                </p>
                <p>
                    To speak of Mrs. Nancy Nenne Nadah is to speak of legacy. Of silent revolutions. Of sacrificial love. Of excellence that did not need to shout to be heard. Her name belongs in the Hall of Fame of Adamawa State, and her memory deserves to be immortalized by both Maya and Bwatiye nations as a symbol of what a single life, lived with purpose, can achieve.
                </p>
                <p>
                    Today, as we mourn and celebrate the life and times of this daughter of honor, we do not mourn alone. A grateful region, a proud nation, and a host of souls across the land rise to salute her.
                </p>
                <p>
                    Rest, Silent Amazon.
                    <br />
                    Rest, Enigmatic Matriarch.
                    <br />
                    Rest, Mother of Nations.
                </p>
                <p>
                    Your legacy lives on—in libraries and classrooms, in families and communities, in hearts and in history.
                </p>
            </>
        ),
    },
    {
        id: 2,
        name: "Dr. Denis Richard Shatima",
        relationship: "Son",
        message: (
            <>
                <p>
                    Mummy, how do I begin to put into words the depth of my love, respect, and
                    gratitude for you? You were not only my mother — you were my first teacher,
                    my moral compass, my cheerleader, and the steady anchor that has kept me
                    grounded all my life.
                </p>
                <p>
                    Born on the 27th of December, 1943, and now called to glory on the 26th of
                    July, 2025, you lived a life of dignity, excellence, and service. You
                    distinguished yourself as an accomplished librarian and educator, leaving an
                    Indelible mark on all those whose lives you touched. But beyond your
                    professional achievements, you built a home rooted in love, discipline, and
                    I still remember that special day on the 28th of February, 1992, during my National Youth Service
                    when you wrote me a letter — a letter filled with wisdom, encouragement, and hope. You told me to
                    hold on to integrity, to be kind, and to never forget the God who holds our future. I promised you
                    then that I would read that letter again when you left this world. Today, with tears in my eyes and
                    gratitude in my heart, I have fulfilled that promise. Your words still guide me, just as your love still
                    surrounds me.
                </p>
                <p>
                    As your son, I had the privilege of watching you up close — your strength in challenges, your grace
                    under pressure, your unwavering faith in God, and your endless sacrifices for me, Catherine,
                    Mataboyo, Mildred, and Biggy. You gave us roots so we could stand firm, and wings so we could
                    fly.
                </p>
                <p>
                    Mummy, I miss you deeply. I will miss our talks, your laughter, your counsel, and even your gentle
                    rebukes. But I take comfort in knowing that you have entered your eternal rest, free from pain, and
                    embraced by the One you served so faithfully.
                    Your legacy lives on — in your children, your grandchildren, and in everyone whose life you
                    touched. Thank you for loving me without measure, for believing in me even when I doubted myself,
                    and for showing me what it means to live a life of purpose.
                </p>
                <p>
                    Rest well, Mummy. Until we meet again in glory, I will carry your light in my heart forever.
                </p>
            </>
        )
    },
    {
        id: 3,
        name: "Mrs. Catherine Macdonald Jatau",
        relationship: "Daughter",
        message: (
            <>
                <p>
                    My beloved mother, Words cannot capture the depth of my love for you, nor
                    the pain of losing you. You were more than my mother—you were my anchor,
                    my teacher, my comfort, and my friend.
                </p>
                <p>
                    Your life was a testimony of strength, kindness, and faith. You poured yourself
                    into your family, making sacrifices we could never repay. In your last days, I
                    had the honor of walking beside you through the pain. Those moments were
                    not easy, but they were sacred. Every tear, every whispered prayer, every
                    moment holding your hand was my way of saying “thank you” for a lifetime of
                    love. Even in your weakest moments, you taught me courage. You showed me that true love
                    stands, even when the body is tired. I will forever cherish the smile you gave me through the pain,
                    the way your eyes still lit up when I entered the room, and the quiet strength you carried until the
                    very end.
                </p>
                <p>
                    Though my heart is broken, I am grateful you are now at peace, free from suffering. Your memory
                    will remain alive in my heart and in the lives of all who knew you. Rest well, Mama. You ran your
                    race, you fought your battles, and you loved deeply. I am proud to be your daughter. Until we meet
                    again.
                </p>
            </>
        )
    },
    {
        id: 4,
        name: "Mataboyo Samson Nadah",
        relationship: "Son",
        message:
            "My Trubute to my Mum, you were Exceptional and extraordinary, kind and full of love for every human being. You taught me how to love everyone without exception. Today, I celebrate you for all you have taught us .I love you and farewell",
    },
    {
        id: 5,
        name: "Mildred Nadah Pita",
        relationship: "Daughter",
        message: (
            <>
                <p>
                    Dear Mama, to pen this tribute has been difficult for me. Because how can I
                    capture the essence of who you are in only a few lines? Never in the past
                    because for me you live forever. Not only in my past, my present but also in
                    what my tomorrow will be. You remain the voice of reason, the one who
                    corrects in love. The one who is never quick to speak, the one who sees the
                    good in every situation. I stand tall today because of the shoulders you gave,
                    your heartbeat that propels each of us to do great and to live our lives serving
                    humanity.
                </p>
                <p>
                    You stand above them all. God indeed raises the lowly to seat
                    amongst Kings. You stand above them all. You represent peace, unity and
                    love with grace. You show us that power is never about how loud one is but it's subtle and must be in the service of others. You sparked my curiosity about the world, you show
                    me that it is possible to conquer it all. You stand above them all. I salut you Woman of Valor, I salut
                    you Great Woman, I salut you my mother. You live forever in our hearts. Love you to the moon and
                    back.
                </p>
            </>
        )
    },
    {
        id: 6,
        name: "Fauno ‘Biggy’ Nadah",
        relationship: "Son",
        message: (
            <>

                It was not the pain and suffering that made us despair; our fear was that your bileless heart is too powerful to see nor hear those who mutter &  kindle a fire. We asked ourselves; how did you come about such a beautiful, immaculate, brilliant, gorgeous heart?  But who are we to question the election of grace bestowed before time began? But who are we to question the election of grace bestowed before time began? It is better to do nothing and say nothing so that they will not know that grace is irreversiblywithdrawn for those who attain the power of age to come ahead of its time by adamic perfection.


                In a world filled with strife, you were born to manifest the love of God; believing J316 was fulfilled, you lived OneJ316 as hostile floods poured- underneath you were His everlasting arms that carried you to a better place. You heart was too pure the see the difference between biological and gifted children; you remained faithful to the one who loved you and became an oasis in this whirling vortex


                We pray your exit will be therapy for those who fear that openly acknowledging that an educated girl child can make a people living in darkness to see a great light will reveal the frailty of reputation- and there is even room for pity as the diurnal reminders come again and again


                Like the mother Tortoise challenged to the race of life by the haughty and speedy Hare; you have lined the tracks to the finish line with a posterity that look and act like you. Oh! death where is your pyrrhic victory?


                And to the One who went up that hill to win the rights to all generations, we say thank you for your kindness and mercies to the living and the dead; may your memory continue as a blessing to the hungry, naked, sick and bound for whom the alabaster box of your heart and life was broken as a drink offering that will be celebrated for generations to come


                As your last son, it is my privilege to proclaim for generations to come the final Will and Testament of Mama Nenne Nadah; ZUCIYA DAYA LAYA NE!
            </>

        )

    },
    {
        id: 7,
        name: "Chief Kennedy B Dauda, mni",
        relationship: "Chairman Adamawa State Local Government Service Commission",
        message: (
            <>

                Kaka-Lagos , as my children  and I  usually call you. The news  of your sudden demise came to us as a  rude shock. Oh ,  How  ARE THE MIGHTY FALLEN!!!


                Kaka-Lagos, you were  truly  a promise keeper, which you demonstrated  with passion and unwavering commitment to the well-being  of all   of  us, your children. Siblings and grandchildren.  Which will be greatly missed .


                May the good Lord receive you and grant your  soul  everlasting  rest  in Jesus' name. It's hard for me to SAY GOOD NIGHT,


            </>

        )
    },
    {
        id: 8,
        name: "Prof Justin Simon Pita",
        relationship: "Son-in-law",
        message: (
            <>

                Nana is not my Mother-in-Law, she is my Mother, she is Maman-Yola. I am thankful for the love she gave so freely. She leaves a legacy of quiet strength and wisdom that I will hold close, ALWAYS.


                Nouria, Ivan, Adniel, Milly and I are loving you forever.


            </>

        )
    },
    {
        id: 9,
        name: "Hauwa Nadah",
        relationship: "Daughter-in-law",
        message: (
            <>

                From the moment I became part of your family, you embraced me with open arms and a heart full of warmth. Your kindness, wisdom, words of encouragement, constant prayers, and unwavering support have been a steady light guiding my path. You were not just a mother-in-law, you were a mother, a friend, a mentor, and a precious part of our lives.


                Your strength, patience, and grace inspired me daily. Through your actions, you taught me the true meaning of love, humility, patience, and generosity. The way you cared for everyone around you was a living example of how one person’s heart can brighten the world.


                Thank you for every word of wisdom, every prayer whispered on our behalf, every lesson taught, and every moment shared. You have shaped our lives in ways too numerous to count, and your presence was a blessing beyond words.


                Though you are no longer physically with us, your legacy lives on in the values you instilled, the memories we treasure, and the love that continues to bind us. We will honour you by living with the same compassion, faith, and courage you showed every single day. You will be deeply missed, but forever loved. Rest in Glory, Nana.


            </>

        )
    },
    {
        id: 10,
        name: "Mercy Kennedy Dauda",
        relationship: "Permanent Secretary, Boundary Commission, Overseeing Ministry of Culture & Tourism Yola Adamawa State",
        message: (
            <>

                Tribute to a rare gem!! Hmmm!!! Mama!! The unflinching love you’ve shown me and my family will forever linger in our memories. In who can i find your likeness? Your gentle touch, your beautiful smiles ,soft spoken and encouraging words?. Even on your sick bed you still appreciate my kind of being. In your own words you said to me “you look like a queen, and we laugh it all over with beaming smiles.


                My heart is so heavy to say goodbye to a mother with a large  and accommodating heart. Rest on mama! Rest in your Beulah land where there’s peace and joy everlasting with Christ Jesus. God be with you, till we meet again. Adieu!


            </>

        )
    },
    {
        id: 11,
        name: "Chafari Shatima Dennis",
        relationship: "Daughter-in-Law",
        message: (
            <>

                Mama, You were more than just a mother-in-law to me - you embraced me as one of your own biological children, and I will never take that precious gift for granted.


                Thank you for showing me such incredible love and for teaching me to love my own daughters-in-law like my own biological children too. The wisdom and compassion you shared will continue to guide my family for generations to come. Your spirit of inclusive love will live on through each of us.Your legacy will continue to live on in our lives and in my entire family forever and always.


                Continue to rest well with the Lord, Mama - our beloved mother who welcomed everyone with open arms. Till we meet to part no more, Nana. With endless love and gratitude,


            </>

        )
    },
    {
        id: 12,
        name: "Lidua Mac-Donald Jatau",
        relationship: "Grandson",
        message: (
            <>

                My Nana, those childhood holidays with you remain one of my most treasured memories. Your home was my safe haven, filled with unconditional love and warmth.


                You made me feel incredibly special, listening to my dreams and fears with genuine care. Your greatest gift was teaching me the joy of giving and helping others. I watched you open your heart to anyone in need, showing me that true wealth comes from helping others, not keeping for ourselves.


                Your hands were always busy caring for people, yet never too busy to comfort me. The values you instilled shaped who I am today. Thank you for the magical holidays and for showing me life's greatest joy comes from lifting others up. Rest well Nana.

            </>

        )
    },
    {
        id: 13,
        name: "Mrs Mamla Felix Elam",
        relationship: "Granddaughter",
        message: (
            <>

                I was blessed to spend my childhood with my Nana, and those years remain some of the happiest in my life. She was caring, thoughtful, and full of wisdom, always ready to share a story or a kind word.


                Her home was a place of comfort, laughter, and love. She taught me so much through her actions — the importance of respect, patience, and treating people well.


                I will always be grateful for the time we shared, the memories we made, and the lessons she passed on to me. Nana lived a life worth remembering, and I am proud to have been a part of it. Rest well, Nana. You will always be in my heart.


            </>

        )
    },
    {
        id: 14,
        name: "Payema Jatau",
        relationship: "Granddaughter",
        message: (
            <>

                Nana was a woman of strength and grace, whose impact was felt by many. Her wisdom and kindness were constants, and her ability to connect with others was remarkable. She faced life's challenges with resilience, leaving behind a legacy of compassion and inspiration. I will forever cherish your memory.


            </>

        )
    },
    {
        id: 15,
        name: "Peshirya, Mivanyi and Atsaktiya",
        relationship: "Grandchildren",
        message: (
            <>

                Beloved Nana,We miss you so much and cherish all the love you gave us. You were the most incredible grandmother we could have asked for.


                You had a gift for making ordinary days extraordinary just by being with us. May you rest in eternal peace, Grandma. Forever in our hearts,


            </>

        )
    },
    {
        id: 16,
        name: "Pwaveno and Ledapwa",
        relationship: "Grandchildren",
        message: (
            <>

                Our hearts are filled with love and longing for you. We are so grateful for the wonderful grandma you were to us.


                Every memory we shared with you was filled with joy and wonder,Rest in Peace Grandma.


            </>

        )
    },
    {
        id: 17,
        name: "Adniel, Ivan and Nouria",
        relationship: "Grandchildren",
        message: (
            <>

                Nana, we love and miss you. Thank you for being an awesome grandma.


                You made every moment with you feel special and magical. Rest in peace, Grandma.


            </>

        )
    },
    {
        id: 18,
        name: "Suzie S Wakawa",
        relationship: "Family Friend",
        message: (
            <>

                Mama, Your life was a blessing, your memory a treasure. You are loved beyond words and raised and missed beyond measure.


            </>

        )
    },
    {
        id: 19,
        name: "Glory Emmanuel Masai",
        relationship: "Family Friend",
        message: (
            <>

                Mummy your life i honor your Departure i  accept, your memory i cherish. And although there is grief today as i say goodbye, there is gratitude for your life. i am truly grateful for the privilege of having shared life with you. But Rest now at the end of the days.


            </>

        )
    },
    {
        id: 20,
        name: "Dwarati Tense Lamu",
        relationship: "Family Friend",
        message: (
            <>

                Your constant advice to me was always to pray hard and work hard so that I could take care of my parents and younger siblings and this prayer will come to pass. As you are up there with the Lord, I pray He grants you a peaceful resting place where you can rest until we meet to part no more. I Miss You Nana.


            </>

        )
    },
    {
        id: 21,
        name: "Godspower Kevin IK",
        relationship: "Family Friend",
        message: (
            <>

                grandma was known for her generous spirit and willingness to help others. She always had a listening ear and a warm hug for anyone who needed it. May your soul rest in peace Grandma.


                I will always miss you Grandma.


            </>

        )
    },
    {
        id: 22,
        name: "Naniyo Duwon",
        relationship: "Family Friend",
        message: (
            <>

                Mama  (YG), it is hard to believe you are gone. Your door was always open, your words always kind, and your heart always ready to give.


                I will always remember your warmth, your laughter, and the way you treated me like your daughter. You lived a life full of grace, strength, and love, and those of us who knew you are better because of it.


                You may have left this world, but your goodness will live on in the lives you touched. Rest well, Mama. You will never be forgotten.


            </>

        )
    }
]

export default function TributesPage() {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Navigation */}
            <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                            <ArrowLeft className="h-5 w-5" />
                            <span className="font-medium">Back to Home</span>
                        </Link>

                        <div className="flex items-center gap-2">
                            <Heart className="h-6 w-6 text-rose-500" />
                            <h1 className="text-xl font-semibold text-slate-900">Tributes</h1>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Tributes to Mrs. Nancy Nenne Nadah (née LEHA)</h2>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Quintessential Mother . Silent Amazon. Public Servant of
                            Uncommon Distinction. Woman of Valour.
                            1943 - 2025</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Final words and messages of love from Nancy's closest family and friends, as shared during her celebration
                            of life.
                        </p>
                    </div>

                    {/* Tributes List */}
                    <div className="space-y-6">
                        {tributes.map((tribute) => (
                            <Card key={tribute.id} className="border-slate-200 hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    {/* Header: Contains Avatar, Name, and Relationship */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <Avatar className="h-12 w-12 border-2 border-rose-100 flex-shrink-0">
                                            <AvatarFallback className="bg-rose-50 text-rose-700 font-semibold">
                                                {getInitials(tribute.name)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1">
                                            {/* This part handles the Name/Badge responsiveness */}
                                            <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
                                                <h4 className="font-semibold text-slate-900">{tribute.name}</h4>
                                                <Badge variant="secondary" className="bg-rose-50 text-rose-700 border-rose-200 h-auto whitespace-normal text-center">
                                                    {tribute.relationship}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Body: The message, now outside the initial flex layout */}
                                    <div className="text-slate-700 leading-relaxed text-justify space-y-4">
                                        {tribute.message}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
