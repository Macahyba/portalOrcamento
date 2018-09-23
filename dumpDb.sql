--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id integer NOT NULL,
    nomecliente character varying(255) NOT NULL,
    cnpj character varying(16) NOT NULL,
    responsavel character varying(255) NOT NULL,
    departamento character varying(255) NOT NULL
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clientes_id_seq OWNER TO postgres;

--
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;


--
-- Name: equipamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipamentos (
    id integer NOT NULL,
    nomeequip character varying(255) NOT NULL,
    serialnumber character varying(16) NOT NULL
);


ALTER TABLE public.equipamentos OWNER TO postgres;

--
-- Name: equipamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.equipamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.equipamentos_id_seq OWNER TO postgres;

--
-- Name: equipamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.equipamentos_id_seq OWNED BY public.equipamentos.id;


--
-- Name: orcamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orcamentos (
    id bigint NOT NULL,
    idusuario integer NOT NULL,
    idequip integer NOT NULL,
    idcliente integer NOT NULL,
    valor real NOT NULL,
    status character varying(16) NOT NULL,
    datacriacao timestamp without time zone DEFAULT now(),
    dataaprov timestamp without time zone
);


ALTER TABLE public.orcamentos OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    nomeusuario character varying(255) NOT NULL,
    email character varying(32) NOT NULL,
    perfil character varying(16) NOT NULL,
    password character(60)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: clientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);


--
-- Name: equipamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipamentos ALTER COLUMN id SET DEFAULT nextval('public.equipamentos_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes (id, nomecliente, cnpj, responsavel, departamento) FROM stdin;
1	TVG	CNPJTVG	CARLOS	ENGENHARIA
3	TVR	TVR	TVR	TVR
4	TVC	TVC	TVC	TVC
5	TVZ	TVZ	TVZ	TVZ
6	TVA	TVA	TVA	TVA
7	TVB	TVB	TVB	TVB
8	TVD	TVD	TVD	TVD
9	TVE	TVE	TVE	TVE
10	A	A	A	A
11	B	B	B	B
12	C	C	C	C
13	D	D	D	D
14	E	E	E	E
15	F	F	F	F
16	G	G	G	G
17	H	H	HHH	H
18	I	I	I	I
19	J	J	J	J
20	K	K	K	K
21	L	L	L	L
22	M	M	M	MM
23	N	N	N	N
\.


--
-- Data for Name: equipamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipamentos (id, nomeequip, serialnumber) FROM stdin;
1	ODS-D77	123456
9	PMW-200	654321
10	A	A
11	B	B
12	C	C
13	D	D
14	E	E
15	F	F
16	G	G
17	H	H
18	I	I
19	F	2
\.


--
-- Data for Name: orcamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orcamentos (id, idusuario, idequip, idcliente, valor, status, datacriacao, dataaprov) FROM stdin;
201809001000	1	1	1	1000	APROVADO	2018-09-22 22:33:11.33105	2018-09-22 22:59:40.389315
201809009000	1	12	9	1	NOVO	2018-09-22 23:20:39.360384	\N
201809017000	1	10	17	1	NOVO	2018-09-22 23:35:05.698006	\N
201809018000	1	10	18	2	NOVO	2018-09-22 23:35:18.692658	\N
201809010000	1	13	10	1	NOVO	2018-09-22 23:35:27.068399	\N
201809023000	1	18	23	1	NOVO	2018-09-22 23:46:40.140383	\N
201809010001	1	10	10	1	NOVO	2018-09-22 23:48:18.867319	\N
201809010002	1	10	10	1	NOVO	2018-09-22 23:50:02.517888	\N
201809010003	1	10	10	1	NOVO	2018-09-22 23:50:41.895993	\N
201809012000	1	12	12	1	NOVO	2018-09-22 23:52:11.00321	2018-09-22 23:54:17.944438
201809011000	1	11	11	2	REJEITADO	2018-09-22 23:51:35.478666	2018-09-22 23:54:27.210205
201809010004	1	19	10	1	NOVO	2018-09-22 23:57:26.771151	2018-09-23 00:00:15.246271
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, nomeusuario, email, perfil, password) FROM stdin;
1	maca	maca@maca.com	manager	$2b$11$NqofYnUaaPwPPooH9AA6keLkH5Ao0i50.rpEEOgSdBw7TFt2HzVsa
2	teste	teste	usuario	$2b$11$rmlRvYTeIaHMQCg3eq.8te7e7PY34osKf16BLatA0tFcRe3CuaNfm
3	a	a	usuario	$2b$11$RLOhGRafBISwTIc8/sU0ge7eD1XpU3fpohUFwjBquRv.ZCZONePgK
\.


--
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_seq', 23, true);


--
-- Name: equipamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipamentos_id_seq', 19, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: clientes clientes_nomecliente_cnpj_responsavel_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_nomecliente_cnpj_responsavel_key UNIQUE (nomecliente, cnpj, responsavel);


--
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- Name: equipamentos equipamentos_nomeequip_serialnumber_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipamentos
    ADD CONSTRAINT equipamentos_nomeequip_serialnumber_key UNIQUE (nomeequip, serialnumber);


--
-- Name: equipamentos equipamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipamentos
    ADD CONSTRAINT equipamentos_pkey PRIMARY KEY (id);


--
-- Name: orcamentos orcamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamentos
    ADD CONSTRAINT orcamentos_pkey PRIMARY KEY (id);


--
-- Name: users users_nomeusuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nomeusuario_key UNIQUE (nomeusuario);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: orcamentos orcamentos_idcliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamentos
    ADD CONSTRAINT orcamentos_idcliente_fkey FOREIGN KEY (idcliente) REFERENCES public.clientes(id);


--
-- Name: orcamentos orcamentos_idequip_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamentos
    ADD CONSTRAINT orcamentos_idequip_fkey FOREIGN KEY (idequip) REFERENCES public.equipamentos(id);


--
-- Name: orcamentos orcamentos_idusuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamentos
    ADD CONSTRAINT orcamentos_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

