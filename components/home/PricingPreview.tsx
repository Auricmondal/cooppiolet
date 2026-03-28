import React from 'react'
import { Check } from 'lucide-react'
import HeaderAnimation from '@/components/animations/HeaderAnimation'

const PricingPreview = () => {
  const plans = [
    {
      name: 'Essentiel',
      price: '0€',
      description: 'Pour les petites structures qui se lancent.',
      features: [
        "Gestion jusqu'à 50 membres",
        'Outils de communication basiques',
        'Support par email',
        'Paiements en ligne',
      ],
      cta: 'Commencer gratuitement',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '29€',
      interval: '/mois',
      description: 'La solution complète pour grandir sereinement.',
      features: [
        'Membres illimités',
        'Génération de reçus fiscaux',
        'Tableaux de bord avancés',
        'Support prioritaire 7/7',
        'Outils de vote',
      ],
      cta: "Démarrer l'essai gratuit",
      highlighted: true,
    },
  ]

  return (
    <section className="w-full bg-slate-50 px-4 py-24 md:py-32">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center">
        <div className="mb-16 text-center">
          <HeaderAnimation
            text="Simple et transparent."
            delay={40}
            animateBy="words"
            direction="bottom"
            className="mb-6 justify-center text-4xl font-black text-slate-900 md:text-5xl"
          />
          <p className="max-w-xl text-lg text-slate-600">
            Trouvez le plan adapté à la taille de votre structure. Aucun frais caché, aucun
            engagement.
          </p>
        </div>

        <div className="flex w-full max-w-4xl flex-col justify-center gap-8 md:flex-row">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-1 flex-col rounded-[2rem] p-8 transition-transform duration-300 hover:-translate-y-2 md:p-10 ${
                plan.highlighted
                  ? 'bg-cst-neutral-14 ring-cst-primary/30 relative text-white shadow-2xl ring-4'
                  : 'border border-slate-100 bg-white text-slate-900 shadow-xl'
              }`}
            >
              {plan.highlighted && (
                <div className="from-cst-primary to-cst-primary-light absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r px-4 py-1 text-xs font-bold tracking-wider text-white uppercase shadow-lg">
                  Le plus populaire
                </div>
              )}

              <h3
                className={`text-2xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}
              >
                {plan.name}
              </h3>
              <p
                className={`mt-2 text-sm ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}
              >
                {plan.description}
              </p>

              <div className="my-8 flex items-end gap-1">
                <span
                  className={`text-5xl font-black tracking-tight ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}
                >
                  {plan.price}
                </span>
                {plan.interval && (
                  <span
                    className={`mb-2 font-medium ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}
                  >
                    {plan.interval}
                  </span>
                )}
              </div>

              <ul className="mb-8 flex flex-1 flex-col gap-4">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className={
                        plan.highlighted ? 'text-cst-primary-light mt-0.5' : 'text-cst-green mt-0.5'
                      }
                    />
                    <span className={plan.highlighted ? 'text-slate-300' : 'text-slate-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-2xl py-4 font-bold shadow-lg transition-all active:scale-95 ${
                  plan.highlighted
                    ? 'bg-cst-primary hover:bg-cst-primary-light text-white'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingPreview
