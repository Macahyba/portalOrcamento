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
    nomecompleto character varying(255) NOT NULL,
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
    desconto real DEFAULT '0'::real,
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
    login character varying(255) NOT NULL,
    nome character varying(255) NOT NULL,
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

COPY public.clientes (id, nomecliente, nomecompleto, cnpj, responsavel, departamento) FROM stdin;
2	TVG	GLOBO PARTICIPAÇÕES	CNPJGLOBO	WILSON	ENGENHARIA
\.


--
-- Data for Name: equipamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipamentos (id, nomeequip, serialnumber) FROM stdin;
1	PMW-200	SW1234
\.


--
-- Data for Name: orcamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orcamentos (id, idusuario, idequip, idcliente, valor, desconto, status, datacriacao, dataaprov) FROM stdin;
201809002000	1	1	2	1000	0	NOVO	2018-09-24 14:59:51.951674	2018-09-24 15:01:39.500316
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, login, nome, email, perfil, password) FROM stdin;
1	Admin	Administrador do sistema	admin@admin	admin	$2b$11$sjTdyTd2hTMj9oB15pbx.OPi2YkouV3AVDUTrG5gvykTuTWOdLWPO
4	Manager	Gerente	manager@manager	manager	$2b$11$OxCtD0w6IN.E.MgLacU6t.mrr4nhF19p16f/wgVolrSEw4JAN4njq
5	User	Usuario Comum	usuario@usuario	usuario	$2b$11$P9wke1pCGJ1VJdk5b7B58Oh1iy2p5TAqlP37mHAssC7ZrnZtxAcEG
\.


--
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_seq', 2, true);


--
-- Name: equipamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipamentos_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


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
-- Name: users users_login_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_key UNIQUE (login);


--
-- Name: users users_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey1 PRIMARY KEY (id);


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

