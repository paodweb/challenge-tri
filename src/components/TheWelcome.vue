<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Principe</template>
    <p>
      Le challenge est une compétition interne au sein du club, tous(tes) les licenciés(es) y
      participent. Le principe est simple : chaque licencié(e) qui participe a une course de la
      saison en cours, que ce soit une course sur route, un trail, un triathlon, un duathlon, un
      swim&run, etc., rapporte un certain nombre de points en fonction de son classement. Plus
      le(la) licencié(e) participe à des courses, plus il(elle) accumule des points. Le classement
      permet de suivre l'évolution des points de chacun(e) tout au long de la saison.
    </p>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Règlement</template>
    <p>Le règlement du challenge est strict et ne souffre d'aucune contestation possible... 😰</p>
    <p>
      Vous pouvez consulter le
      <router-link :to="`/challenge-rules`" class="text-indigo-600 hover:text-indigo-900"
        >règlement détaillé</router-link
      >.
    </p>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Fair play</template>
    <p>
      Le challenge reste un jeu... Il est évident bien sur que le fair play reste la règle
      principale qui doit animer tous les participantes et tous les participants.
    </p>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Communauté</template>
    <p>
      Afin de faire perdurer la tradition du challenge, il est possible de télécharger une version
      "tableur" du mode de calcul du challenge :<br />
      <em>bientôt ici</em>.
    </p>
  </WelcomeItem>
</template>
