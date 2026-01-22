--
-- PostgreSQL database dump
--

\restrict 16Z8UX5aPv32zDrRHMlEaVEBZctpH7Cq0ee5jQeaiLSL4mK8W5jvkT98dAFNrFr

-- Dumped from database version 16.11 (Debian 16.11-1.pgdg13+1)
-- Dumped by pg_dump version 16.11 (Debian 16.11-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.user_skill DROP CONSTRAINT IF EXISTS "user_skill_userId_fkey";
ALTER TABLE IF EXISTS ONLY public.user_skill DROP CONSTRAINT IF EXISTS "user_skill_skillId_fkey";
ALTER TABLE IF EXISTS ONLY public.user_challenge DROP CONSTRAINT IF EXISTS "user_challenge_userId_fkey";
ALTER TABLE IF EXISTS ONLY public.user_challenge DROP CONSTRAINT IF EXISTS "user_challenge_challengeId_fkey";
ALTER TABLE IF EXISTS ONLY public.skill DROP CONSTRAINT IF EXISTS "skill_roadmapId_fkey";
ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS "session_userId_fkey";
ALTER TABLE IF EXISTS ONLY public.question DROP CONSTRAINT IF EXISTS "question_challengeId_fkey";
ALTER TABLE IF EXISTS ONLY public.follow DROP CONSTRAINT IF EXISTS "follow_followingId_fkey";
ALTER TABLE IF EXISTS ONLY public.follow DROP CONSTRAINT IF EXISTS "follow_followerId_fkey";
ALTER TABLE IF EXISTS ONLY public.account DROP CONSTRAINT IF EXISTS "account_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."_SkillPrerequisites" DROP CONSTRAINT IF EXISTS "_SkillPrerequisites_B_fkey";
ALTER TABLE IF EXISTS ONLY public."_SkillPrerequisites" DROP CONSTRAINT IF EXISTS "_SkillPrerequisites_A_fkey";
DROP INDEX IF EXISTS public.user_xp_idx;
DROP INDEX IF EXISTS public."user_skill_userId_skillId_key";
DROP INDEX IF EXISTS public.user_email_key;
DROP INDEX IF EXISTS public."user_challenge_userId_challengeId_key";
DROP INDEX IF EXISTS public."skill_roadmapId_slug_key";
DROP INDEX IF EXISTS public.session_token_key;
DROP INDEX IF EXISTS public.roadmap_slug_key;
DROP INDEX IF EXISTS public."_SkillPrerequisites_B_index";
ALTER TABLE IF EXISTS ONLY public.verification DROP CONSTRAINT IF EXISTS verification_pkey;
ALTER TABLE IF EXISTS ONLY public.user_skill DROP CONSTRAINT IF EXISTS user_skill_pkey;
ALTER TABLE IF EXISTS ONLY public."user" DROP CONSTRAINT IF EXISTS user_pkey;
ALTER TABLE IF EXISTS ONLY public.user_challenge DROP CONSTRAINT IF EXISTS user_challenge_pkey;
ALTER TABLE IF EXISTS ONLY public.skill DROP CONSTRAINT IF EXISTS skill_pkey;
ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS session_pkey;
ALTER TABLE IF EXISTS ONLY public.roadmap DROP CONSTRAINT IF EXISTS roadmap_pkey;
ALTER TABLE IF EXISTS ONLY public.question DROP CONSTRAINT IF EXISTS question_pkey;
ALTER TABLE IF EXISTS ONLY public.follow DROP CONSTRAINT IF EXISTS follow_pkey;
ALTER TABLE IF EXISTS ONLY public.account DROP CONSTRAINT IF EXISTS account_pkey;
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."_SkillPrerequisites" DROP CONSTRAINT IF EXISTS "_SkillPrerequisites_AB_pkey";
ALTER TABLE IF EXISTS ONLY public."Challenge" DROP CONSTRAINT IF EXISTS "Challenge_pkey";
DROP TABLE IF EXISTS public.verification;
DROP TABLE IF EXISTS public.user_skill;
DROP TABLE IF EXISTS public.user_challenge;
DROP TABLE IF EXISTS public."user";
DROP TABLE IF EXISTS public.skill;
DROP TABLE IF EXISTS public.session;
DROP TABLE IF EXISTS public.roadmap;
DROP TABLE IF EXISTS public.question;
DROP TABLE IF EXISTS public.follow;
DROP TABLE IF EXISTS public.account;
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TABLE IF EXISTS public."_SkillPrerequisites";
DROP TABLE IF EXISTS public."Challenge";
DROP TYPE IF EXISTS public."Role";
DROP TYPE IF EXISTS public."Difficulty";
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Difficulty; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Difficulty" AS ENUM (
    'EASY',
    'MEDIUM',
    'HARD'
);


--
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Challenge; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Challenge" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    difficulty public."Difficulty" NOT NULL,
    xp integer NOT NULL,
    tags text[],
    coins integer DEFAULT 20 NOT NULL
);


--
-- Name: _SkillPrerequisites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_SkillPrerequisites" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account (
    id text NOT NULL,
    "userId" text NOT NULL,
    "accountId" text NOT NULL,
    "providerId" text NOT NULL,
    "accessToken" text,
    "refreshToken" text,
    "expiresAt" timestamp(3) without time zone,
    password text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: follow; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.follow (
    "followerId" text NOT NULL,
    "followingId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: question; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.question (
    id text NOT NULL,
    "challengeId" text NOT NULL,
    question text NOT NULL,
    options text[],
    answer integer NOT NULL
);


--
-- Name: roadmap; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roadmap (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    id text NOT NULL,
    "userId" text NOT NULL,
    token text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "ipAddress" text,
    "userAgent" text,
    "createdAt" timestamp(3) without time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: skill; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skill (
    id text NOT NULL,
    slug text NOT NULL,
    "roadmapId" text NOT NULL,
    label text NOT NULL,
    description text,
    content text,
    xp integer DEFAULT 50 NOT NULL,
    "positionX" double precision NOT NULL,
    "positionY" double precision NOT NULL
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id text NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    "emailVerified" boolean NOT NULL,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    xp integer DEFAULT 0 NOT NULL,
    badges text[] DEFAULT ARRAY[]::text[],
    "completedChallengesCount" integer DEFAULT 0 NOT NULL,
    "lastActive" timestamp(3) without time zone,
    "maxStreak" integer DEFAULT 0 NOT NULL,
    streak integer DEFAULT 0 NOT NULL,
    coins integer DEFAULT 0 NOT NULL,
    hearts integer DEFAULT 3 NOT NULL,
    "lastHeartLoss" timestamp(3) without time zone,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL
);


--
-- Name: user_challenge; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_challenge (
    id text NOT NULL,
    "userId" text NOT NULL,
    "challengeId" text NOT NULL,
    "completedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: user_skill; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_skill (
    id text NOT NULL,
    "userId" text NOT NULL,
    "skillId" text NOT NULL,
    "unlockedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: verification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.verification (
    id text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone,
    "updatedAt" timestamp(3) without time zone
);


--
-- Data for Name: Challenge; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Challenge" (id, title, description, difficulty, xp, tags, coins) FROM stdin;
cmko0we8b00004cwopus60lz7	Histoire de France	Testez vos connaissances sur l'histoire de France.	MEDIUM	200	{histoire,france,culture}	20
cmko0we8k000b4cwojmrb85tq	Géographie Mondiale	Connaissez-vous bien notre planète ?	MEDIUM	200	{géographie,monde,voyage}	20
cmko0we8p000m4cwob8zh5kjh	Sciences & Nature	Explorez les mystères de la science et de la nature.	HARD	250	{science,nature,biologie,physique}	20
cmko0we8v000x4cwo4izhz3ky	Cinéma & Séries	Pour les cinéphiles incollables.	EASY	150	{cinéma,film,"culture pop"}	20
cmko0we9400184cwo48cuqwy3	Musique	Testez votre rythme et vos connaissances musicales.	EASY	150	{musique,art,chanson}	20
cmko0we9e001j4cwo2qqhlxan	Littérature Classique	Les grands auteurs et leurs oeuvres.	HARD	250	{littérature,livre,lecture}	20
cmko0we9k001u4cwokbjm5vh6	Sport	Êtes-vous un champion ?	EASY	150	{sport,compétition,"jeux olympiques"}	20
cmko0we9o00254cwowdepxgd0	Gastronomie	Cuisine et saveurs du monde.	MEDIUM	200	{cuisine,nourriture,lifestyle}	20
cmko0we9t002g4cwobzwonwgq	Animaux & Nature	Le règne animal.	EASY	150	{animaux,nature,biologie}	20
cmko0we9y002r4cwoun7q25ga	Technologie & Innovation	Le monde numérique et les inventions.	MEDIUM	200	{tech,informatique,futur}	20
\.


--
-- Data for Name: _SkillPrerequisites; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."_SkillPrerequisites" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e5c62c85-3c07-499c-9594-eee256cae13e	1000d042a8fc3f6baeff41c02233858eef5dbfb7173cfb9a50d93715b206d88c	2026-01-21 10:03:26.060462+00	20260113145921_init	\N	\N	2026-01-21 10:03:26.036954+00	1
b201cd2a-c1af-424f-a619-d15fdd6b4464	2a9213ab0b93a42795ba0aa778f70d4cc166dfcf0ffef9d0af4f51c530061d6d	2026-01-21 10:03:26.163767+00	20260115101859_init_better_auth	\N	\N	2026-01-21 10:03:26.063026+00	1
da582d40-98e6-4f52-8003-25c1e217f475	719dee7da9f48503362e2fedf36a19ce6b568cc5f1909dbb13bcd54401b34ab7	2026-01-21 10:03:26.172715+00	20260115143629_fix_account_dates	\N	\N	2026-01-21 10:03:26.165861+00	1
b66089e0-921a-47aa-b299-6ae7902c8d76	4964c1f4e6442a36dc9c60f6888025919d66969f87e9e937c5754ab16f385541	2026-01-21 10:03:26.183649+00	20260115144105_make_session_token_unique	\N	\N	2026-01-21 10:03:26.174746+00	1
1d5daad9-f5fc-4b52-a043-1b305b64a7ca	5848648d5ee44161151e4221c4695ebe3812919c190e36fa47e6308959fc7f53	2026-01-21 10:03:26.202533+00	20260120123336_add_cascade_delete_to_user_relations	\N	\N	2026-01-21 10:03:26.18549+00	1
97aee190-7e46-4636-8eea-601042e135d3	84b93520364f28c1ef570c5b34d6baa856ad0db72b8f85102bc54540498a2c87	2026-01-21 10:03:26.217818+00	20260120135356_add_follow_system	\N	\N	2026-01-21 10:03:26.204856+00	1
9e60d895-5fca-41dd-b688-ac0b7d1d5424	67347b033042515e281181f566743494c061ce5c5e7433a3ae1e985e32ea7230	2026-01-21 10:03:26.229389+00	20260120163108_allow_multiple_challenge_completions	\N	\N	2026-01-21 10:03:26.220197+00	1
\.


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.account (id, "userId", "accountId", "providerId", "accessToken", "refreshToken", "expiresAt", password, "createdAt", "updatedAt") FROM stdin;
irGIbZkpMjrkyDNhFaZLBbirbTbjf48c	JM7BzLDYXZZ50OPbBKOCfKL5WamlWDpD	JM7BzLDYXZZ50OPbBKOCfKL5WamlWDpD	credential	\N	\N	\N	a89cec7c64275a6c26c1dee33e1aeae4:8a6f21ccdba3cef24f0f72977d1e403ce7f0b3c4c8a37574ce58ac962900bb69b8ba5573346efa945f99b37d78cf2bd1c3e5745ee2f6a2348fac999dff938099	2026-01-21 14:31:54.089	2026-01-21 14:31:54.089
0F9msWCWWqbGKP5LT1vcOcrpQI3PxPAW	pyMbzVvpulir5GQM1pscYsU3tYojeq9d	pyMbzVvpulir5GQM1pscYsU3tYojeq9d	credential	\N	\N	\N	145199011b1184c81688c81762d0333e:8aec3bcc6e5938f53f8941772a222449f310ad0ade34411dacd026670e3a8b4a3a33bd1ffbd0a713faa3da084db5df5ee8395ebd28128c5abcf53c7673265681	2026-01-21 15:46:50.965	2026-01-21 15:46:50.965
BVnTEdj8WlnaxkVRlPnTGcA8eWJyRSLQ	Q0i63OiF8QwzrXKpxHoPN7v6xdhXWR3x	Q0i63OiF8QwzrXKpxHoPN7v6xdhXWR3x	credential	\N	\N	\N	c65f8729192fd8bd11338fd00cbe1106:5b39561ffe8ff3ec0bc811b430be8c6ff49398c8f8398080420e0354063f458b92f5fbc6cf88344b86aeeee0fee896d28f1cfa2eb7456598703d5d5c90337ab1	2026-01-21 15:58:34.074	2026-01-21 15:58:34.074
\.


--
-- Data for Name: follow; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.follow ("followerId", "followingId", "createdAt") FROM stdin;
Q0i63OiF8QwzrXKpxHoPN7v6xdhXWR3x	pyMbzVvpulir5GQM1pscYsU3tYojeq9d	2026-01-21 18:00:17.813
Q0i63OiF8QwzrXKpxHoPN7v6xdhXWR3x	JM7BzLDYXZZ50OPbBKOCfKL5WamlWDpD	2026-01-21 18:00:18.519
\.


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.question (id, "challengeId", question, options, answer) FROM stdin;
cmko0we8c00014cwokpfgmr9w	cmko0we8b00004cwopus60lz7	Qui fut le premier roi de France ?	{Charlemagne,Clovis,"Louis XIV",Napoléon}	1
cmko0we8c00024cwoac0j9qpl	cmko0we8b00004cwopus60lz7	En quelle année a eu lieu la prise de la Bastille ?	{1789,1799,1804,1776}	0
cmko0we8c00034cwol3poe5kx	cmko0we8b00004cwopus60lz7	Qui est surnommé le Roi-Soleil ?	{"Louis XIII","Louis XIV","Louis XVI","Henri IV"}	1
cmko0we8c00044cwoizmcu23z	cmko0we8b00004cwopus60lz7	Quelle guerre a duré de 1337 à 1453 ?	{"La Guerre de Cent Ans","La Guerre de Trente Ans","La Première Guerre mondiale","Les Guerres de religion"}	0
cmko0we8c00054cwon6s20sr9	cmko0we8b00004cwopus60lz7	Qui a instauré le Code Civil ?	{"De Gaulle",Robespierre,"Napoléon Bonaparte","François Ier"}	2
cmko0we8c00064cwochghzdsk	cmko0we8b00004cwopus60lz7	Quelle héroïne a délivré Orléans en 1429 ?	{"Jeanne d'Arc","Aliénor d'Aquitaine",Marie-Antoinette,"Olympe de Gouges"}	0
cmko0we8c00074cwo5e1f15xz	cmko0we8b00004cwopus60lz7	En quelle année la France a-t-elle remporté sa première Coupe du Monde de football ?	{1986,1998,2006,2018}	1
cmko0we8c00084cworfckgg8j	cmko0we8b00004cwopus60lz7	Qui a été le premier président de la Ve République ?	{"François Mitterrand","Georges Pompidou","Charles de Gaulle","Valéry Giscard d'Estaing"}	2
cmko0we8c00094cwo8hptpsoy	cmko0we8b00004cwopus60lz7	Quel roi a été guillotiné en 1793 ?	{"Louis XVI","Louis XV","Louis XIV","Henri III"}	0
cmko0we8c000a4cwon830yebm	cmko0we8b00004cwopus60lz7	Quel traité a mis fin à la Première Guerre mondiale ?	{"Le traité de Rome","Le traité de Verdun","Le traité de Versailles","Le traité de Paris"}	2
cmko0we8k000c4cwoa2gkazmg	cmko0we8k000b4cwojmrb85tq	Quel est le plus grand pays du monde par superficie ?	{Chine,États-Unis,Canada,Russie}	3
cmko0we8k000d4cwoj1hz7yfg	cmko0we8k000b4cwojmrb85tq	Quelle est la capitale de l'Australie ?	{Sydney,Melbourne,Canberra,Perth}	2
cmko0we8k000e4cwoi1ea7i9w	cmko0we8k000b4cwojmrb85tq	Quel fleuve traverse l'Égypte ?	{L'Amazone,"Le Nil","Le Yangzi Jiang","Le Mississipi"}	1
cmko0we8k000f4cwotwx0jbax	cmko0we8k000b4cwojmrb85tq	Dans quel pays se trouve le Machu Picchu ?	{Chili,Pérou,Bolivie,Équateur}	1
cmko0we8k000g4cwooixdvxtp	cmko0we8k000b4cwojmrb85tq	Quel est le plus haut sommet du monde ?	{"Mont Blanc",K2,Everest,Kilimandjaro}	2
cmko0we8k000h4cwoj6mtg6u6	cmko0we8k000b4cwojmrb85tq	Quelle mer sépare l'Europe de l'Afrique ?	{"La mer Rouge","La mer Noire","La mer Méditerranée","La mer Caspienne"}	2
cmko0we8k000i4cwoa15ya5y4	cmko0we8k000b4cwojmrb85tq	Combien y a-t-il d'États aux États-Unis ?	{48,50,52,49}	1
cmko0we8k000j4cwop3tb98oo	cmko0we8k000b4cwojmrb85tq	Quelle est la capitale du Japon ?	{Osaka,Tokyo,Kyoto,Hiroshima}	1
cmko0we8k000k4cwoyc3c24lw	cmko0we8k000b4cwojmrb85tq	Quel pays a la forme d'une botte ?	{L'Espagne,"Le Portugal","La Grèce",L'Italie}	3
cmko0we8k000l4cwof5b86xg0	cmko0we8k000b4cwojmrb85tq	Sur quel continent se trouve le désert du Sahara ?	{Asie,Amérique,Afrique,Australie}	2
cmko0we8q000n4cwojbtt1hmr	cmko0we8p000m4cwob8zh5kjh	Quel gaz les plantes absorbent-elles pour la photosynthèse ?	{Oxygène,Azote,"Dioxyde de carbone",Hydrogène}	2
cmko0we8q000o4cwoom9y7ppk	cmko0we8p000m4cwob8zh5kjh	Quel est l'élément chimique le plus abondant dans l'univers ?	{Hydrogène,Hélium,Carbone,Oxygène}	0
cmko0we8q000p4cwowhtd3j6n	cmko0we8p000m4cwob8zh5kjh	Combien de planètes composent notre système solaire ?	{7,8,9,10}	1
cmko0we8q000q4cwo0yf0dyqf	cmko0we8p000m4cwob8zh5kjh	Quelle est la vitesse de la lumière (environ) ?	{"300 000 km/s","150 000 km/s","1 000 km/s","3 000 km/s"}	0
cmko0we8q000r4cwoqy0fnfuk	cmko0we8p000m4cwob8zh5kjh	Quel organe pompe le sang dans le corps humain ?	{"Le foie","Le cerveau","Les poumons","Le coeur"}	3
cmko0we8q000s4cwodsd3287l	cmko0we8p000m4cwob8zh5kjh	Quelle est la formule chimique de l'eau ?	{H2O,CO2,O2,NaCl}	0
cmko0we8q000t4cwokcsv5ui6	cmko0we8p000m4cwob8zh5kjh	Qui a formulé la théorie de la relativité ?	{"Isaac Newton","Albert Einstein",Galilée,"Nikola Tesla"}	1
cmko0we8q000u4cwod9z5yi9b	cmko0we8p000m4cwob8zh5kjh	Quel animal est le plus grand mammifère marin ?	{"Le requin baleine","La baleine bleue",L'orque,"Le cachalot"}	1
cmko0we8q000v4cwocpa1ksl4	cmko0we8p000m4cwob8zh5kjh	A quelle température l'eau bout-elle (au niveau de la mer) ?	{90°C,100°C,110°C,120°C}	1
cmko0we8q000w4cwo81me5f7g	cmko0we8p000m4cwob8zh5kjh	Quelle partie de l'atome a une charge positive ?	{Électron,Neutron,Proton,Photon}	2
cmko0we8w000y4cwoo5upv7ox	cmko0we8v000x4cwo4izhz3ky	Qui a réalisé 'Titanic' ?	{"Steven Spielberg","James Cameron","Christopher Nolan","Martin Scorsese"}	1
cmko0we8w000z4cwop0iw9wec	cmko0we8v000x4cwo4izhz3ky	Dans 'Star Wars', qui est le père de Luke Skywalker ?	{"Obi-Wan Kenobi",Yoda,L'Empereur,"Dark Vador"}	3
cmko0we8w00104cwo19zcu4my	cmko0we8v000x4cwo4izhz3ky	Quel film a remporté l'Oscar du meilleur film en 2020 (film sud-coréen) ?	{Roma,Parasite,1917,Joker}	1
cmko0we8w00114cwodfqv4gsd	cmko0we8v000x4cwo4izhz3ky	Quel acteur incarne Iron Man dans le MCU ?	{"Chris Evans","Chris Hemsworth","Robert Downey Jr.","Mark Ruffalo"}	2
cmko0we8w00124cwojachwapj	cmko0we8v000x4cwo4izhz3ky	Dans 'Harry Potter', comment s'appelle l'école de sorcellerie ?	{Beauxbâtons,Durmstrang,Poudlard,Ilvermorny}	2
cmko0we8w00134cwoxcglybf1	cmko0we8v000x4cwo4izhz3ky	Quel film d'animation met en scène des jouets vivants ?	{Shrek,"Toy Story",Nemo,Cars}	1
cmko0we8w00144cwoq7qjuw2e	cmko0we8v000x4cwo4izhz3ky	Qui joue Jack Sparrow dans 'Pirates des Caraïbes' ?	{"Orlando Bloom","Brad Pitt","Johnny Depp","Tom Cruise"}	2
cmko0we8w00154cwomg2j8awh	cmko0we8v000x4cwo4izhz3ky	Quel est le nom du lion dans 'Le Roi Lion' ?	{Mufasa,Scar,Simba,Timon}	2
cmko0we8w00164cwok7poiplq	cmko0we8v000x4cwo4izhz3ky	Quelle série met en scène des dragons et le trône de fer ?	{"The Witcher","Lord of the Rings","Game of Thrones",Vikings}	2
cmko0we8w00174cwo75080t7j	cmko0we8v000x4cwo4izhz3ky	Quel agent secret porte le matricule 007 ?	{"Ethan Hunt","Jason Bourne","James Bond","Jack Ryan"}	2
cmko0we9400194cwo6yxgwfnc	cmko0we9400184cwo48cuqwy3	Qui est surnommé le 'Roi de la Pop' ?	{"Elvis Presley",Prince,"Michael Jackson","Freddie Mercury"}	2
cmko0we94001a4cwojgw7n4a1	cmko0we9400184cwo48cuqwy3	Combien de cordes a une guitare standard ?	{4,5,6,7}	2
cmko0we94001b4cwo0lti2xrc	cmko0we9400184cwo48cuqwy3	Quel groupe a chanté 'Let It Be' ?	{"The Rolling Stones","The Beatles",Queen,U2}	1
cmko0we94001c4cwoohrts3rc	cmko0we9400184cwo48cuqwy3	Quel compositeur est devenu sourd à la fin de sa vie ?	{Mozart,Bach,Beethoven,Chopin}	2
cmko0we94001d4cwofge1dgi0	cmko0we9400184cwo48cuqwy3	Qui chante 'La Vie en rose' ?	{"Édith Piaf","Céline Dion","Mireille Mathieu",Dalida}	0
cmko0we94001e4cwo3e3975xm	cmko0we9400184cwo48cuqwy3	Quel instrument joue-t-on avec un archet ?	{Guitare,Piano,Violon,Saxophone}	2
cmko0we94001f4cwov51f3gso	cmko0we9400184cwo48cuqwy3	De quel pays vient le groupe ABBA ?	{Norvège,Suède,Danemark,Finlande}	1
cmko0we94001g4cwocevltmnv	cmko0we9400184cwo48cuqwy3	Quel style de musique est né à la Nouvelle-Orléans ?	{Rock,Jazz,Reggae,Techno}	1
cmko0we94001h4cwoiqrq25by	cmko0we9400184cwo48cuqwy3	Qui est l'interprète de 'Thriller' ?	{Madonna,"Stevie Wonder","Michael Jackson","David Bowie"}	2
cmko0we94001i4cwoyjfkfn19	cmko0we9400184cwo48cuqwy3	Quel rappeur américain s'appelle Marshall Mathers ?	{Jay-Z,"Snoop Dogg",Eminem,"50 Cent"}	2
cmko0we9f001k4cwopy4biiw5	cmko0we9e001j4cwo2qqhlxan	Qui a écrit 'Les Misérables' ?	{"Émile Zola","Honoré de Balzac","Victor Hugo","Gustave Flaubert"}	2
cmko0we9f001l4cwob47gq1lh	cmko0we9e001j4cwo2qqhlxan	Quel dramaturge a écrit 'Roméo et Juliette' ?	{Molière,"William Shakespeare",Racine,Corneille}	1
cmko0we9f001m4cwo4sb564ss	cmko0we9e001j4cwo2qqhlxan	Qui est l'auteur de 'Le Petit Prince' ?	{"Antoine de Saint-Exupéry","Jules Verne","Albert Camus","Marcel Proust"}	0
cmko0we9f001n4cwopoh7otgp	cmko0we9e001j4cwo2qqhlxan	Dans quel roman trouve-t-on le personnage de d'Artagnan ?	{"Le Comte de Monte-Cristo","Les Trois Mousquetaires","Vingt ans après","La Reine Margot"}	1
cmko0we9f001o4cwoaejmz7fy	cmko0we9e001j4cwo2qqhlxan	Quel poète a écrit 'Les Fleurs du mal' ?	{Rimbaud,Verlaine,Baudelaire,Apollinaire}	2
cmko0we9f001p4cwokus85hg5	cmko0we9e001j4cwo2qqhlxan	Qui a écrit '1984' ?	{"Aldous Huxley","Ray Bradbury","George Orwell","Isaac Asimov"}	2
cmko0we9f001q4cwo375do59a	cmko0we9e001j4cwo2qqhlxan	Quel est le nom du détective créé par Arthur Conan Doyle ?	{"Hercule Poirot","Sherlock Holmes","Miss Marple","Arsène Lupin"}	1
cmko0we9f001r4cwo4syw6bdx	cmko0we9e001j4cwo2qqhlxan	Qui a écrit 'L'Étranger' ?	{"Jean-Paul Sartre","Boris Vian","Albert Camus","Louis-Ferdinand Céline"}	2
cmko0we9f001s4cwozv9ayngm	cmko0we9e001j4cwo2qqhlxan	Quel auteur a écrit 'Harry Potter' ?	{"J.R.R. Tolkien","J.K. Rowling","Stephen King","George R.R. Martin"}	1
cmko0we9f001t4cwofqt5dhxp	cmko0we9e001j4cwo2qqhlxan	Dans quelle ville se déroule 'Notre-Dame de Paris' ?	{Lyon,Marseille,Paris,Rouen}	2
cmko0we9k001v4cwo4lol2ci2	cmko0we9k001u4cwokbjm5vh6	Combien de joueurs y a-t-il dans une équipe de football (sur le terrain) ?	{9,10,11,12}	2
cmko0we9k001w4cwoqvl62ru4	cmko0we9k001u4cwokbjm5vh6	Quel cycliste a remporté 5 fois le Tour de France (dont 4 consécutives) ?	{"Raymond Poulidor","Bernault Hinault","Lance Armstrong","Eddy Merckx"}	3
cmko0we9k001x4cwo56oci043	cmko0we9k001u4cwokbjm5vh6	Dans quel sport utilise-t-on une raquette et un volant ?	{Tennis,Badminton,Squash,Ping-pong}	1
cmko0we9k001y4cwoa2wx36vp	cmko0we9k001u4cwokbjm5vh6	Quel pays organise les Jeux Olympiques de 2024 ?	{États-Unis,Japon,France,Australie}	2
cmko0we9k001z4cwo0kagr34d	cmko0we9k001u4cwokbjm5vh6	Combien de périodes y a-t-il dans un match de hockey sur glace ?	{2,3,4,5}	1
cmko0we9k00204cwosy2tedzi	cmko0we9k001u4cwokbjm5vh6	Qui détient le record du monde du 100m (athlétisme) ?	{"Carl Lewis","Tyson Gay","Usain Bolt","Asafa Powell"}	2
cmko0we9k00214cwon0vhpx63	cmko0we9k001u4cwokbjm5vh6	Quel sport se pratique sur un tatami ?	{Boxe,Escrime,Judo,Natation}	2
cmko0we9k00224cwoz20d5xw6	cmko0we9k001u4cwokbjm5vh6	Combien de points vaut un panier classique au basket (hors ligne des 3 points) ?	{1,2,3,4}	1
cmko0we9k00234cwolxrn5rpa	cmko0we9k001u4cwokbjm5vh6	Quelle compétition de tennis se déroule sur terre battue à Paris ?	{Wimbledon,"US Open",Roland-Garros,"Open d'Australie"}	2
cmko0we9k00244cwoafomxgsq	cmko0we9k001u4cwokbjm5vh6	Quel est le sport national de la Nouvelle-Zélande ?	{Football,Cricket,Rugby,Surf}	2
cmko0we9p00264cwoht527ydi	cmko0we9o00254cwowdepxgd0	Quel est l'ingrédient principal du guacamole ?	{Tomate,Avocat,Oignon,Citron}	1
cmko0we9p00274cwota3qd9qk	cmko0we9o00254cwowdepxgd0	De quel pays vient la pizza ?	{France,États-Unis,Italie,Espagne}	2
cmko0we9p00284cwobp2xr73o	cmko0we9o00254cwowdepxgd0	Qu'est-ce que le tofu ?	{"Du fromage de chèvre","De la pâte de soja","Du blé fermenté","Un champignon"}	1
cmko0we9p00294cwoxq34p4qx	cmko0we9o00254cwowdepxgd0	Quel vin est traditionnellement pétillant ?	{Bordeaux,Champagne,Bourgogne,"Côtes du Rhône"}	1
cmko0we9p002a4cwosjb152ym	cmko0we9o00254cwowdepxgd0	Quel est le plat national de l'Espagne (souvent associé à Valence) ?	{Tapas,Paella,Gazpacho,Tortilla}	1
cmko0we9p002b4cwontopbwqg	cmko0we9o00254cwowdepxgd0	Avec quel légume fait-on des frites ?	{Carotte,Navet,"Patate douce","Pomme de terre"}	3
cmko0we9p002c4cwozae07cdb	cmko0we9o00254cwowdepxgd0	Quel est l'ingrédient principal du chocolat ?	{Sucre,Lait,Cacao,Vanille}	2
cmko0we9p002d4cwosvkz9pl8	cmko0we9o00254cwowdepxgd0	Dans quel pays mange-t-on des sushis ?	{Chine,Japon,Thaïlande,Vietnam}	1
cmko0we9p002e4cwoh0f13cbt	cmko0we9o00254cwowdepxgd0	Quel fruit est une agrume ?	{Pomme,Banane,Citron,Fraise}	2
cmko0we9p002f4cwowm3hf3po	cmko0we9o00254cwowdepxgd0	Quelle épice est la plus chère du monde ?	{Vanille,Safran,Cannelle,Poivre}	1
cmko0we9u002h4cwotfdzp4te	cmko0we9t002g4cwobzwonwgq	Quel est l'animal le plus rapide au monde (sur terre) ?	{Lion,Gazelle,Guépard,Cheval}	2
cmko0we9u002i4cwohajbjjzt	cmko0we9t002g4cwobzwonwgq	Combien de pattes a une araignée ?	{6,8,10,12}	1
cmko0we9u002j4cwo14bf5wvo	cmko0we9t002g4cwobzwonwgq	Quel oiseau ne peut pas voler ?	{Aigle,Pigeon,Autruche,Hirondelle}	2
cmko0we9u002k4cwoben8f9kw	cmko0we9t002g4cwobzwonwgq	Quel animal est le symbole du WWF ?	{Tigre,Panda,Éléphant,Gorille}	1
cmko0we9u002l4cwoyt6h5wsw	cmko0we9t002g4cwobzwonwgq	Comment appelle-t-on le petit du chien ?	{Chaton,Chiot,Poussin,Veau}	1
cmko0we9u002m4cwouhz1gxss	cmko0we9t002g4cwobzwonwgq	Quel mammifère pond des oeufs ?	{Kangourou,Ornithorynque,Chauve-souris,Dauphin}	1
cmko0we9u002n4cwofk9yqhgp	cmko0we9t002g4cwobzwonwgq	Quel est le plus grand primate ?	{Chimpanzé,Gorille,Orang-outan,Babouin}	1
cmko0we9u002o4cwoys5azrru	cmko0we9t002g4cwobzwonwgq	Où vivent les ours polaires ?	{Arctique,Antarctique,Amazonie,Sahara}	0
cmko0we9u002p4cwogpofhg7k	cmko0we9t002g4cwobzwonwgq	Quel reptile change de couleur ?	{Lézard,Caméléon,Serpent,Tortue}	1
cmko0we9u002q4cwov3rozn2c	cmko0we9t002g4cwobzwonwgq	Quel insecte produit du miel ?	{Fourmi,Guêpe,Abeille,Papillon}	2
cmko0we9y002s4cwod9tp7e1q	cmko0we9y002r4cwoun7q25ga	Qui a fondé Microsoft ?	{"Steve Jobs","Bill Gates","Mark Zuckerberg","Elon Musk"}	1
cmko0we9y002t4cwo23jadrdj	cmko0we9y002r4cwoun7q25ga	Que signifie 'WWW' ?	{"World Wide Web","World Web Wibe","Wide World Web","Web World Wide"}	0
cmko0we9y002u4cwou8tlvmsp	cmko0we9y002r4cwoun7q25ga	Quel réseau social a pour logo un oiseau bleu (anciennement) ?	{Facebook,Instagram,Twitter,Snapchat}	2
cmko0we9y002v4cwobolm0nl7	cmko0we9y002r4cwoun7q25ga	Quelle entreprise fabrique l'iPhone ?	{Samsung,Google,Apple,Huawei}	2
cmko0we9y002w4cwot5uf45yy	cmko0we9y002r4cwoun7q25ga	Quel est le moteur de recherche le plus utilisé au monde ?	{Bing,Yahoo,Google,DuckDuckGo}	2
cmko0we9y002x4cwolhli6kkq	cmko0we9y002r4cwoun7q25ga	En quelle année le premier homme a-t-il marché sur la Lune ?	{1959,1969,1979,1989}	1
cmko0we9y002y4cwo31yimb3i	cmko0we9y002r4cwoun7q25ga	Quel langage informatique est principalement utilisé pour le web (frontend) ?	{Python,Java,C++,JavaScript}	3
cmko0we9y002z4cwo3rybunbh	cmko0we9y002r4cwoun7q25ga	Comment s'appelle l'IA conversationnelle d'OpenAI ?	{Siri,Alexa,ChatGPT,Cortana}	2
cmko0we9y00304cwovctgderc	cmko0we9y002r4cwoun7q25ga	Quel est le nom de la monnaie virtuelle la plus célèbre ?	{Euro,Dollar,Bitcoin,Gold}	2
cmko0we9y00314cwoxkqsquy7	cmko0we9y002r4cwoun7q25ga	Quelle couleur est le robot R2-D2 ?	{"Rouge et Or","Bleu et Blanc","Noir et Blanc","Vert et Jaune"}	1
\.


--
-- Data for Name: roadmap; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roadmap (id, slug, title, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session (id, "userId", token, "expiresAt", "ipAddress", "userAgent", "createdAt", "updatedAt") FROM stdin;
46YDaYoUH4ajdnerGu56YWMsEu4bKZNF	Q0i63OiF8QwzrXKpxHoPN7v6xdhXWR3x	FVG8LYa5OIapB0sO0BkXDxYfnD04Tosp	2026-01-28 17:59:53.795		Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0	2026-01-21 17:59:53.795	2026-01-21 17:59:53.795
\.


--
-- Data for Name: skill; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.skill (id, slug, "roadmapId", label, description, content, xp, "positionX", "positionY") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (id, email, name, "emailVerified", image, "createdAt", "updatedAt", xp, badges, "completedChallengesCount", "lastActive", "maxStreak", streak, coins, hearts, "lastHeartLoss", role) FROM stdin;
Q0i63OiF8QwzrXKpxHoPN7v6xdhXWR3x	nini@nini.com	Ninon	f	\N	2026-01-21 15:58:34.068	2026-01-21 18:03:11.147	200	{fondateur}	1	2026-01-21 16:01:40.734	1	1	20	1	2026-01-21 18:03:11.147	USER
JM7BzLDYXZZ50OPbBKOCfKL5WamlWDpD	pipi@pipi.com	pipi	f	\N	2026-01-21 14:31:54.084	2026-01-21 14:51:53.06	200	{fondateur}	1	2026-01-21 14:44:42.273	1	1	120	0	2026-01-21 14:51:53.059	USER
pyMbzVvpulir5GQM1pscYsU3tYojeq9d	caca@coco.com	Julien	f	\N	2026-01-21 15:46:50.956	2026-01-21 15:50:24.232	200	{fondateur}	1	2026-01-21 15:50:24.229	1	1	120	2	2026-01-21 15:50:10.635	USER
\.


--
-- Data for Name: user_challenge; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_challenge (id, "userId", "challengeId", "completedAt") FROM stdin;
cmko4wjv80000egwon7eldwfs	JM7BzLDYXZZ50OPbBKOCfKL5WamlWDpD	cmko0we8k000b4cwojmrb85tq	2026-01-21 14:44:42.26
cmko791i20000ocwops8wsn5u	pyMbzVvpulir5GQM1pscYsU3tYojeq9d	cmko0we8k000b4cwojmrb85tq	2026-01-21 15:50:24.218
cmko7nji10000q4wop5swr9z7	Q0i63OiF8QwzrXKpxHoPN7v6xdhXWR3x	cmko0we8k000b4cwojmrb85tq	2026-01-21 16:01:40.729
\.


--
-- Data for Name: user_skill; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_skill (id, "userId", "skillId", "unlockedAt") FROM stdin;
\.


--
-- Data for Name: verification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.verification (id, identifier, value, "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Challenge Challenge_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Challenge"
    ADD CONSTRAINT "Challenge_pkey" PRIMARY KEY (id);


--
-- Name: _SkillPrerequisites _SkillPrerequisites_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_SkillPrerequisites"
    ADD CONSTRAINT "_SkillPrerequisites_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: follow follow_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follow
    ADD CONSTRAINT follow_pkey PRIMARY KEY ("followerId", "followingId");


--
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);


--
-- Name: roadmap roadmap_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roadmap
    ADD CONSTRAINT roadmap_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: skill skill_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill
    ADD CONSTRAINT skill_pkey PRIMARY KEY (id);


--
-- Name: user_challenge user_challenge_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_challenge
    ADD CONSTRAINT user_challenge_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_skill user_skill_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_skill
    ADD CONSTRAINT user_skill_pkey PRIMARY KEY (id);


--
-- Name: verification verification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verification
    ADD CONSTRAINT verification_pkey PRIMARY KEY (id);


--
-- Name: _SkillPrerequisites_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_SkillPrerequisites_B_index" ON public."_SkillPrerequisites" USING btree ("B");


--
-- Name: roadmap_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX roadmap_slug_key ON public.roadmap USING btree (slug);


--
-- Name: session_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX session_token_key ON public.session USING btree (token);


--
-- Name: skill_roadmapId_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "skill_roadmapId_slug_key" ON public.skill USING btree ("roadmapId", slug);


--
-- Name: user_challenge_userId_challengeId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "user_challenge_userId_challengeId_key" ON public.user_challenge USING btree ("userId", "challengeId");


--
-- Name: user_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);


--
-- Name: user_skill_userId_skillId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "user_skill_userId_skillId_key" ON public.user_skill USING btree ("userId", "skillId");


--
-- Name: user_xp_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_xp_idx ON public."user" USING btree (xp);


--
-- Name: _SkillPrerequisites _SkillPrerequisites_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_SkillPrerequisites"
    ADD CONSTRAINT "_SkillPrerequisites_A_fkey" FOREIGN KEY ("A") REFERENCES public.skill(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _SkillPrerequisites _SkillPrerequisites_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_SkillPrerequisites"
    ADD CONSTRAINT "_SkillPrerequisites_B_fkey" FOREIGN KEY ("B") REFERENCES public.skill(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: account account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: follow follow_followerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follow
    ADD CONSTRAINT "follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: follow follow_followingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follow
    ADD CONSTRAINT "follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: question question_challengeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT "question_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES public."Challenge"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: session session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: skill skill_roadmapId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill
    ADD CONSTRAINT "skill_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES public.roadmap(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_challenge user_challenge_challengeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_challenge
    ADD CONSTRAINT "user_challenge_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES public."Challenge"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_challenge user_challenge_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_challenge
    ADD CONSTRAINT "user_challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_skill user_skill_skillId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_skill
    ADD CONSTRAINT "user_skill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES public.skill(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_skill user_skill_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_skill
    ADD CONSTRAINT "user_skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 16Z8UX5aPv32zDrRHMlEaVEBZctpH7Cq0ee5jQeaiLSL4mK8W5jvkT98dAFNrFr

