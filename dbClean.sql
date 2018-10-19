--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

-- Started on 2018-10-19 00:08:21

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
-- TOC entry 1 (class 3079 OID 16722)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2847 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 16727)
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id integer NOT NULL,
    nomecliente character varying(255) NOT NULL,
    nomecompleto character varying(255) NOT NULL,
    cnpj character varying(32) NOT NULL,
    responsavel character varying(255) NOT NULL,
    departamento character varying(255) NOT NULL
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16733)
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
-- TOC entry 2848 (class 0 OID 0)
-- Dependencies: 197
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;


--
-- TOC entry 198 (class 1259 OID 16735)
-- Name: equipamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipamentos (
    id integer NOT NULL,
    nomeequip character varying(255) NOT NULL,
    serialnumber character varying(16) NOT NULL
);


ALTER TABLE public.equipamentos OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16738)
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
-- TOC entry 2849 (class 0 OID 0)
-- Dependencies: 199
-- Name: equipamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.equipamentos_id_seq OWNED BY public.equipamentos.id;


--
-- TOC entry 200 (class 1259 OID 16740)
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
    iduseraprov integer,
    dataaprov timestamp without time zone
);


ALTER TABLE public.orcamentos OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16745)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(255) NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(32) NOT NULL,
    perfil character varying(16) NOT NULL,
    cargo character varying(255) NOT NULL,
    telefone character varying(20) NOT NULL,
    password character(60) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16751)
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
-- TOC entry 2850 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2688 (class 2604 OID 16864)
-- Name: clientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);


--
-- TOC entry 2689 (class 2604 OID 16865)
-- Name: equipamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipamentos ALTER COLUMN id SET DEFAULT nextval('public.equipamentos_id_seq'::regclass);


--
-- TOC entry 2692 (class 2604 OID 16866)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2832 (class 0 OID 16727)
-- Dependencies: 196
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes (id, nomecliente, nomecompleto, cnpj, responsavel, departamento) FROM stdin;
\.


--
-- TOC entry 2834 (class 0 OID 16735)
-- Dependencies: 198
-- Data for Name: equipamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipamentos (id, nomeequip, serialnumber) FROM stdin;
\.


--
-- TOC entry 2836 (class 0 OID 16740)
-- Dependencies: 200
-- Data for Name: orcamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orcamentos (id, idusuario, idequip, idcliente, valor, desconto, status, datacriacao, iduseraprov, dataaprov) FROM stdin;
\.


--
-- TOC entry 2837 (class 0 OID 16745)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, login, nome, email, perfil, cargo, telefone, password) FROM stdin;
1	Admin	Administrador do sistema	admin@admin	admin	Administrador do Sistema	+5521999999999	$2b$11$sjTdyTd2hTMj9oB15pbx.OPi2YkouV3AVDUTrG5gvykTuTWOdLWPO
\.


--
-- TOC entry 2851 (class 0 OID 0)
-- Dependencies: 197
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_seq', 1, false);


--
-- TOC entry 2852 (class 0 OID 0)
-- Dependencies: 199
-- Name: equipamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipamentos_id_seq', 1, false);


--
-- TOC entry 2853 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, false);


--
-- TOC entry 2694 (class 2606 OID 16757)
-- Name: clientes clientes_nomecliente_cnpj_responsavel_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_nomecliente_cnpj_responsavel_key UNIQUE (nomecliente, cnpj, responsavel);


--
-- TOC entry 2696 (class 2606 OID 16759)
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- TOC entry 2698 (class 2606 OID 16761)
-- Name: equipamentos equipamentos_nomeequip_serialnumber_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipamentos
    ADD CONSTRAINT equipamentos_nomeequip_serialnumber_key UNIQUE (nomeequip, serialnumber);


--
-- TOC entry 2700 (class 2606 OID 16763)
-- Name: equipamentos equipamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipamentos
    ADD CONSTRAINT equipamentos_pkey PRIMARY KEY (id);


--
-- TOC entry 2702 (class 2606 OID 16765)
-- Name: orcamentos orcamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamentos
    ADD CONSTRAINT orcamentos_pkey PRIMARY KEY (id);


--
-- TOC entry 2704 (class 2606 OID 16767)
-- Name: users users_login_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_key UNIQUE (login);


--
-- TOC entry 2706 (class 2606 OID 16769)
-- Name: users users_pkey1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey1 PRIMARY KEY (id);


--
-- TOC entry 2707 (class 2606 OID 16770)
-- Name: orcamentos orcamentos_idcliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamentos
    ADD CONSTRAINT orcamentos_idcliente_fkey FOREIGN KEY (idcliente) REFERENCES public.clientes(id);


--
-- TOC entry 2708 (class 2606 OID 16775)
-- Name: orcamentos orcamentos_idequip_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamentos
    ADD CONSTRAINT orcamentos_idequip_fkey FOREIGN KEY (idequip) REFERENCES public.equipamentos(id);


--
-- TOC entry 2709 (class 2606 OID 16780)
-- Name: orcamentos orcamentos_iduseraprov_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamentos
    ADD CONSTRAINT orcamentos_iduseraprov_fkey FOREIGN KEY (iduseraprov) REFERENCES public.users(id);


--
-- TOC entry 2710 (class 2606 OID 16785)
-- Name: orcamentos orcamentos_idusuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamentos
    ADD CONSTRAINT orcamentos_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.users(id);


--
-- TOC entry 2846 (class 0 OID 0)
-- Dependencies: 7
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-10-19 00:08:24

--
-- PostgreSQL database dump complete
--

