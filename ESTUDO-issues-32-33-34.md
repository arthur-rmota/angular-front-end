# Estudo: issues 32, 33 e 34

- #32: excluir tarefa com confirmação
- #33: mostrar o estado de carregando
- #34: mostrar o estado de erro

A ideia central é uma só: **uma requisição HTTP passa por 3 fases (carregando, sucesso, erro)** e a tela precisa mostrar algo diferente em cada uma.

---

## 0. Conceitos que sustentam tudo

### Observable e `.subscribe()`
O `HttpClient` do Angular devolve um **Observable**. Ele é uma "receita" de requisição e **não faz nada até alguém se inscrever** (`subscribe`). Por isso o comentário em `api.ts`: "só enviam o pedido quando chama .subscribe()".

### `rxResource` (já usado no projeto)
É um wrapper que pega um Observable e entrega o resultado como **signals** prontos para o template:

| Propriedade | O que é |
|---|---|
| `.value()` | os dados (ou `undefined` enquanto não chegaram) |
| `.hasValue()` | `true` se já tem dado |
| `.isLoading()` | `true` enquanto a requisição está em andamento |
| `.error()` | o erro, se a requisição falhou (senão `undefined`) |
| `.reload()` | **refaz a requisição** |

As issues 33 e 34 usam só `isLoading()`, `error()` e `reload()`. Não precisei criar nenhum estado novo, porque o `rxResource` já controla isso.

### Signal
Valor reativo. Quando muda, o template que o lê é atualizado sozinho. É por isso que `@if (tarefas.isLoading())` aparece e some sem eu mandar.

### Control flow do template (`@if`, `@else if`, `@for`)
Sintaxe nova do Angular para condicionais no HTML.

---

## 1. Issue 32: Excluir tarefa com confirmação

A issue pede 4 coisas: função na API, botão, confirmação e lista atualizada depois.

### 1.1 Função na API: `src/app/api.ts`

```ts
excluirTarefa(id: string): Observable<void> {
  return this.http.delete<void>(`${this.url}/tarefas/${id}`);
}
```

- `DELETE /tarefas/:id` é o verbo HTTP de remover (como `POST` cria e `PATCH` altera).
- O json-server apaga o registro do `db.json`.
- Devolve `Observable<void>`: não há dado de volta, só importa se deu certo ou não.
- Como todo Observable, **só dispara quando alguém dá `.subscribe()`**.

### 1.2 Botão, confirmação e chamada: `cartao-tarefa`

Botão no HTML (`cartao-tarefa.html`):
```html
<button type="button" class="botao-excluir" (click)="excluir()">Excluir</button>
```
`(click)="excluir()"` é *event binding*: quando clica, chama o método do componente.

Lógica (`cartao-tarefa.ts`):
```ts
private api = inject(Api);
excluida = output<void>();

excluir() {
  if (!confirm(`Excluir a tarefa "${this.tarefa().titulo}"?`)) return;

  this.api.excluirTarefa(this.tarefa().id).subscribe({
    next: () => this.excluida.emit(),
    error: () => alert('Não foi possível excluir a tarefa. Tente de novo.'),
  });
}
```

Passo a passo:
1. `confirm(...)` é o diálogo nativo do navegador (OK/Cancelar). Devolve `true` ou `false`. Se cancelou, o `return` sai da função e **nada é enviado**.
2. Se confirmou, chama `excluirTarefa(...).subscribe(...)`. Aqui a requisição é de fato enviada.
3. `subscribe({ next, error })` recebe duas funções. `next` roda se deu certo e `error` roda se falhou.
4. No sucesso, `this.excluida.emit()` avisa o componente pai que a tarefa foi excluída.

`inject(Api)` é a forma moderna de pedir um serviço ao Angular (injeção de dependência), no lugar de passar pelo construtor.

### 1.3 `output()` e como o pai atualiza a lista

O cartão **não sabe** em que lista está (tarefas, quadro ou página do projeto). Então ele só **avisa** com um `output` ("fui excluída") e quem decide o que fazer é o pai. Isso é comunicação **filho → pai**. O contrário, **pai → filho**, é o `input` (`tarefa = input.required<Tarefa>()`).

Nos pais (`lista-tarefas.ts`, `quadro-tarefas.html`, `pagina-projeto.ts`):
```html
<app-cartao-tarefa [tarefa]="tarefa" (excluida)="tarefas.reload()" />
```
- `[tarefa]="tarefa"`: colchetes são *property binding* (pai manda dado para o filho).
- `(excluida)="..."`: parênteses são *event binding* (pai escuta o evento do filho).
- `tarefas.reload()` refaz o GET. A lista busca os dados de novo e **a tarefa excluída some**, que é o "lista atualizada depois" da issue.
- Na página do projeto é `projeto.reload()`, porque lá o recurso se chama `projeto`.

Fluxo completo:
```
clique → confirm() → DELETE na API → emit() → pai chama reload() → GET → lista nova na tela
```

---

## 2. Issue 33: Estado de carregando

O mesmo bloco foi colocado em todas as telas que buscam dados (lista de tarefas, quadro, lista de projetos, página do projeto, detalhe da tarefa, editar tarefa, editar projeto):

```html
@if (tarefas.isLoading()) {
  <p class="carregando">Carregando...</p>
}
```

**Teoria:** entre pedir os dados e eles chegarem existe um intervalo. Sem indicação, a tela fica em branco e o usuário acha que quebrou. `isLoading()` fica `true` exatamente nesse intervalo. O `rxResource` alterna esse signal sozinho e o template reage.

Nas telas de detalhe/edição, o `@else` final (quando ainda não tem dado e não é 404) é o que mostra esse "Carregando...".

O estilo `.carregando` está em `src/styles.css`.

---

## 3. Issue 34: Estado de erro

```html
@if (tarefas.error()) {
  <p class="erro" role="alert">
    ⚠ Não foi possível carregar os dados. Verifique se o json-server está rodando.
    <button type="button" class="botao-secundario" (click)="tarefas.reload()">Tentar de novo</button>
  </p>
}
```

**Teoria:**
- Se o json-server estiver parado, o `HttpClient` falha (erro de rede) e o `rxResource` guarda isso em `.error()`.
- `@if (x.error())` só aparece nesse caso. Mostra mensagem clara e a opção de tentar de novo.
- "Tentar de novo" é `(click)="x.reload()"`. Refaz a requisição. Se o servidor voltou, os dados aparecem e o erro some, porque `error()` volta a ficar vazio.
- `role="alert"` é acessibilidade: leitores de tela leem a mensagem na hora.

### O caso especial do 404
Nas telas de detalhe e edição já existia o componente `NaoEncontrada`. Eram dois erros diferentes:
- **404**: o servidor respondeu, mas a tarefa com esse id não existe. É "não encontrada".
- **Erro de rede**: o servidor nem respondeu. É "API fora do ar".

Por isso criei:
```ts
naoExiste() {
  return (this.tarefa.error() as { status?: number } | undefined)?.status === 404;
}
```
O erro do `HttpClient` tem a propriedade `status` (código HTTP). O `as { status?: number }` só diz ao TypeScript qual é o formato do erro. O `?.` (optional chaining) evita quebrar quando `error()` é `undefined`.

E o template fica numa cadeia:
```html
@if (tarefa.hasValue()) {
  ...mostra a tarefa...
} @else if (naoExiste()) {
  <app-nao-encontrada />
} @else {
  ...carregando / erro...
}
```
A ordem importa. Primeiro tenta mostrar os dados, depois o 404, e o resto cai em carregando ou erro.

---

## 4. Mapa: onde mexi

| Arquivo | O que mudou |
|---|---|
| `src/app/api.ts` | `excluirTarefa()` |
| `componentes/cartao-tarefa/cartao-tarefa.ts` | `excluir()`, `output excluida`, `inject(Api)` |
| `componentes/cartao-tarefa/cartao-tarefa.html` | botão Excluir |
| `paginas/lista-tarefas/lista-tarefas.ts` | bloco carregando/erro + `(excluida)` |
| `paginas/quadro-tarefas/quadro-tarefas.html` | bloco carregando/erro + `(excluida)` |
| `paginas/pagina-projeto/pagina-projeto.ts` | bloco carregando/erro + `(excluida)` |
| `paginas/lista-projetos/lista-projetos.ts` | bloco carregando/erro |
| `paginas/detalhe-tarefa/detalhe-tarefa.ts` | carregando/erro + `naoExiste()` |
| `paginas/editar-tarefa/editar-tarefa.ts` | carregando/erro + `naoExiste()` |
| `paginas/editar-projeto/editar-projeto.ts` | carregando/erro + `naoExiste()` |
| `src/styles.css` | `.carregando`, `.botao-excluir`, `.erro button` |

---

## 5. Perguntas que podem cair (com resposta curta)

1. **Por que o `subscribe` na exclusão e não um `rxResource`?**
   `rxResource` serve para *buscar* dados que a tela mostra. Excluir é uma *ação* disparada por clique, então usa `subscribe` direto, igual `criarTarefa` e `atualizarTarefa`.
2. **Por que o cartão emite um evento em vez de remover da lista ele mesmo?**
   Porque o cartão é reutilizado em 3 telas com fontes de dados diferentes. Quem é dono da lista é quem sabe recarregar. Isso é baixo acoplamento.
3. **Como o "carregando" funciona sem eu escrever lógica?**
   O `rxResource` já expõe `isLoading()` como signal, e o template reage sozinho.
4. **O que acontece se a exclusão falhar?**
   Cai no `error` do `subscribe` e mostra um `alert`. A lista não é recarregada, então nada some indevidamente.
5. **Diferença entre `[x]` e `(x)` no template?**
   `[x]` manda dado para dentro (input). `(x)` escuta evento que vem de dentro (output ou DOM).
6. **Como testar o erro?**
   Pare o json-server, recarregue a página (aparece a mensagem), suba o json-server e clique em "Tentar de novo".

---

## 6. Como testar na mão
1. `iniciar.bat` (ou `ng serve` mais o json-server na porta 3000).
2. **Excluir:** clique em "Excluir" num card, depois em Cancelar (nada acontece). Clique de novo e confirme (o card some).
3. **Erro:** pare o json-server, recarregue (mensagem com botão). Suba o servidor e clique em "Tentar de novo".
4. **Carregando:** aparece rapidinho ao abrir cada tela. Para ver melhor, throttling "Slow 3G" nas DevTools (F12, aba Network).
