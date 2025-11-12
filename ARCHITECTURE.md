## Notas de arquitetura e sugestões de manutenção

Este arquivo contém recomendações não disruptivas para melhorar a manutenibilidade e a consistência arquitetural.

## Objetivos

- Manter o comportamento inalterado enquanto melhora a ergonomia para desenvolvedores.
- Sugerir refatorações não-bloqueantes que possam ser aplicadas incrementalmente.

## Estrutura sugerida (por funcionalidade)

- src/
  - components/ # componentes compartilhados e de apresentação (Input, Button, etc.)
  - features/
    - prescriptions/
      - components/ # componentes menores específicos de prescriptions
      - screens/ # telas como `NewPrescription`, `MyPrescriptions`
      - hooks/ # hooks específicos da feature (usePrescriptionForm)
      - services/ # chamadas de API / persistência (async-storage, etc.)
  - hooks/ # hooks reutilizáveis
  - services/ # serviços reutilizáveis (cliente API, wrapper de storage)
  - utils/ # helpers puros
  - types/ # tipos TypeScript compartilhados
  - screens/ # opcional: se preferir manter telas separadas das features

Por que por funcionalidade?

- Facilita raciocinar sobre todas as partes relacionadas a uma feature.
- Escala melhor para aplicações maiores.

## Refatorações incrementais (não disruptivas)

1. Extrair o hook `usePrescriptionForm` de `NewPrescription` para centralizar validação.
2. Substituir o campo de texto livre `recorrencia` por um componente select controlado (opções validadas).
3. Fazer `InputComponent` aceitar `keyboardType`, `accessibilityLabel`, `testID` e adicionar testes unitários.
4. Adicionar props ao `Button`: `disabled`, `loading`, `accessibilityState` e testes unitários.
5. Criar barrels (exports) em `src/components/index.ts` para simplificar imports.
6. Adicionar pequenos testes de integração para o fluxo de prescrições (E2E ou component-level).

## Testes e CI

- Adicionar Vitest / Jest para testes unitários e React Native Testing Library para componentes.
- Criar um workflow simples no GitHub Actions para rodar lint e testes em PRs.

## Segurança de tipos

- Centralizar tipos compartilhados em `src/types` e preferir interfaces explícitas para props.
- Considerar habilitar `strict` no TypeScript de forma gradual (`noImplicitAny`, `strictNullChecks`).

## Estilo

- Centralizar tokens de design (cores, espaçamentos) em um arquivo de tema para evitar valores mágicos.

## Documentação

- Manter docs pequenas como esta e adicionar um `CONTRIBUTING.md` com convenções de branch/PR.

## Próximos passos (baixo risco)

- Adicionar este `ARCHITECTURE.md` (arquivo atual).
- Incluir comentários TODO nas components e telas (feito) para guiar mudanças futuras.
- Implementar barrels e um `src/index.ts` para exports compartilhados.

---

Essas sugestões são intencionalmente não invasivas. Se quiser, posso abrir PRs implementando cada mudança incremental (um por PR) para revisão e merge seguro.
