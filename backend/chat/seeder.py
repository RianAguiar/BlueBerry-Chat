import random

from django.core.management.base import BaseCommand
from django.db import transaction
from faker import Faker

from chat.models import Sala, Mensagem

fake = Faker("pt_BR")


class Command(BaseCommand):
    help = "Popula o banco com salas e mensagens fake para desenvolvimento/testes."

    def add_arguments(self, parser):
        parser.add_argument(
            "--salas",
            type=int,
            default=5,
            help="Quantidade de salas a serem criadas (padrão: 5)",
        )
        parser.add_argument(
            "--mensagens",
            type=int,
            default=20,
            help="Quantidade de mensagens por sala (padrão: 20)",
        )
        parser.add_argument(
            "--reply-chance",
            type=float,
            default=0.3,
            help="Probabilidade (0 a 1) de uma mensagem ser resposta a outra (padrão: 0.3)",
        )
        parser.add_argument(
            "--limpar",
            action="store_true",
            help="Apaga todas as Salas e Mensagens existentes antes de popular",
        )

    def handle(self, *args, **options):
        n_salas = options["salas"]
        n_mensagens = options["mensagens"]
        reply_chance = options["reply_chance"]
        limpar = options["limpar"]

        if limpar:
            self.stdout.write("Limpando dados existentes...")
            Mensagem.objects.all().delete()
            Sala.objects.all().delete()

        with transaction.atomic():
            salas = self._criar_salas(n_salas)
            total_mensagens = 0
            for sala in salas:
                total_mensagens += self._criar_mensagens(sala, n_mensagens, reply_chance)

        self.stdout.write(
            self.style.SUCCESS(
                f"Seed concluído: {len(salas)} salas e {total_mensagens} mensagens criadas."
            )
        )

    def _criar_salas(self, n_salas):
        salas = []
        nomes_usados = set()
        while len(salas) < n_salas:
            nome = fake.unique.word().capitalize()
            if nome in nomes_usados:
                continue
            nomes_usados.add(nome)
            sala, criada = Sala.objects.get_or_create(nome=nome)
            salas.append(sala)
            if criada:
                self.stdout.write(f"  Sala criada: {sala.nome}")
        return salas

    def _criar_mensagens(self, sala, n_mensagens, reply_chance):
        mensagens_criadas = []
        for _ in range(n_mensagens):
            resposta = None
            if mensagens_criadas and random.random() < reply_chance:
                resposta = random.choice(mensagens_criadas)

            mensagem = Mensagem.objects.create(
                sala=sala,
                username=fake.user_name(),
                conteudo=fake.sentence(nb_words=random.randint(4, 15)),
                resposta=resposta,
            )
            mensagens_criadas.append(mensagem)

        self.stdout.write(f"  {len(mensagens_criadas)} mensagens criadas em '{sala.nome}'")
        return len(mensagens_criadas)
