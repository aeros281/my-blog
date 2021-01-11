CREATE TABLE public.users
(
    id SERIAL,
    email character varying(50) NOT NULL,
    passhash character varying(255) NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_DATE,
    updated_at date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT user_id_pk PRIMARY KEY (id)
);

ALTER TABLE public.users
    OWNER to my_blog_user;

CREATE TABLE public.posts
(
    id SERIAL,
    user_id integer NOT NULL,
    slug character varying(500) NOT NULL,
    title character varying(100) NOT NULL,
    published boolean NOT NULL,
	markdown_content TEXT NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_DATE,
    updated_at date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT post_id_pk PRIMARY KEY (id),
    CONSTRAINT post_user_fk FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

ALTER TABLE public.posts
    OWNER to my_blog_user;