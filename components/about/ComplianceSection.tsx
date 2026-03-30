'use client'
import React, { useEffect, useRef, useState } from 'react'
import FadeContent from '@/components/animations/FadeContent'
import HeaderAnimation from '@/components/animations/HeaderAnimation'

import Image from 'next/image'
import { Skeleton } from '../ui/skeleton'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Overview, OverviewCard } from '@/types/about'
import { StrapiRichTextRenderer } from '../global/RichTextRenderer'
import { ImageData } from '@/types/home'

const items = [
  {
    title: 'Made & Hosted in Germany',
    body: `All Coop-Pilot infrastructure is physically hosted in data centers located within the Federal Republic of Germany. We do not use any non-German cloud providers for primary storage or processing. Our primary data center infrastructure is located in Frankfurt am Main, with geographically redundant failover in Hamburg.

This means that your member data — including personal identification records, financial contribution histories, and governance documents — never crosses into foreign legal jurisdictions. This is particularly relevant given the extra-territorial reach of legal instruments like the US CLOUD Act, which can compel US-headquartered cloud providers to disclose data stored on their servers regardless of where that data physically resides.

CoopGo is a German GmbH, incorporated under German law. Our terms of service, privacy policy, and data processing agreements are governed by German law and subject to German courts.`,
  },
  {
    title: 'DSGVO & Datenschutz (Data Protection Compliance)',
    body: `Coop-Pilot is built from the architectural level to comply with the European General Data Protection Regulation (GDPR) as implemented in Germany through the Bundesdatenschutzgesetz (BDSG neue Fassung).

Key compliance measures include: explicit purpose limitation (data collected for member management is not processed for any other purpose), data minimization (we only collect what is legally required and functionally necessary), automated deletion pipelines (members removed from your register have their personal data purged after configurable retention windows that comply with German storage obligations), a full right-to-access workflow (administrators can generate DSGVO Article 15 data export reports with a single click), and a documented data breach response protocol that meets the 72-hour notification requirement to the relevant supervisory authority (Datenschutzbehörde).

We maintain a formal Verarbeitungsverzeichnis (Record of Processing Activities) for each customer deployment, and our Data Processing Agreement (Auftragsverarbeitungsvertrag / AVV) meets the requirements of GDPR Article 28.`,
  },
  {
    title: 'Encryption Standards & Technical Security',
    body: `All data stored within Coop-Pilot is encrypted at rest using AES-256, the same standard employed by German banking infrastructure. Data transmitted between your administrators' browsers and our servers is protected by TLS 1.3, with HSTS enforced sitewide and certificate transparency monitoring active.

Access to member data within the platform is governed by role-based access control (RBAC). Cooperative boards can define granular permissions — for example, allowing a membership coordinator to manage Beitrittserklärungen while restricting their access to financial records. Every access event is written to an immutable audit log with cryptographic hashing (SHA-256), ensuring that log entries cannot be retroactively modified.

We conduct annual third-party penetration testing and vulnerability assessments. Findings are triaged within 48 hours and remediated according to a severity-based SLA. Our security architecture documentation is available for review as part of our enterprise due diligence package.`,
  },
  {
    title: 'Genossenschaftsgesetz (GenG) Compliance Engine',
    body: `German cooperative law — codified in the Genossenschaftsgesetz (GenG) — imposes specific requirements on how member records must be maintained, how share capital changes must be documented, and how general assemblies (Generalversammlungen) must be conducted and reported.

Coop-Pilot's compliance engine is updated in parallel with legislative changes. When the 2022 GenG amendments introduced new requirements for digital member applications (Beitrittserklärungen), Coop-Pilot had a compliant workflow available within the update cycle that followed the legislative effective date. When the 2025 ESPR-linked reporting obligations were introduced, we published both a compliance guide for our customers and a product update implementing the new reporting templates.

The compliance engine provides real-time flagging when a record or process enters a state that would be non-compliant under current GenG requirements — for example, if a pending membership application has exceeded the legal response window, or if a share register entry is missing mandatory documentation. These flags are visible to administrators as actionable tasks, not buried in reports.`,
  },
  {
    title: 'GoBD-Konformität & Buchführung',
    body: `The GoBD (Grundsätze zur ordnungsmäßigen Führung und Aufbewahrung von Büchern, Aufzeichnungen und Unterlagen in elektronischer Form) sets the German tax authority's requirements for electronic bookkeeping. Any software used to manage financial records that may be relevant to a tax audit must comply with GoBD.

Coop-Pilot's financial record module — covering member share contributions, entrance fees (Eintrittsgeld), and distributions — is designed to meet GoBD requirements. Records are write-once (post-creation modifications create versioned entries, not overwrites), retention windows are enforced (10-year mandatory retention for financial records), and exports can be generated in the formats required for submission to a DATEV-compatible accounting practice.

Our GoBD compliance statement is available as a formal document for cooperatives that require it for their own auditing process or as part of their Prüfungsbericht with their regional Prüfungsverband.`,
  },
  {
    title: 'Audit & Prüfungsverband Readiness',
    body: `Every registered German cooperative must undergo a periodic statutory audit conducted by a recognized Prüfungsverband. The audit assesses legal compliance, financial integrity, and the adequacy of the cooperative's administrative processes. A poor audit outcome — or worse, a qualified audit opinion — can have significant consequences for a cooperative's standing and operations.

Coop-Pilot is designed to make your Prüfung as straightforward as possible. The platform can generate a structured Prüfungsmappe — a compilation of member records, share register documentation, Generalversammlungs-Protokolle, and financial summaries — formatted to the expected structure of the major German Prüfungsverbände.

We work directly with auditor associations to ensure that Coop-Pilot exports match the record formats that auditors actually use. This means less time spent on manual preparation and significantly lower risk of documentation gaps that could trigger follow-up requests.`,
  },
]

const ComplianceSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const res = await axios.get('/api/about')
      return res.data
    },
  })

  if (isLoading) {
    return (
      <section className="relative flex min-h-[100vh] flex-col items-center justify-start overflow-hidden px-6 pt-32 pb-48 lg:min-h-screen lg:pt-40">
        <div className="relative z-30 flex w-full max-w-[1200px] flex-col items-center px-4">
          <Skeleton className="mb-6 h-32 w-full max-w-4xl" />
          <Skeleton className="mb-10 h-12 w-full max-w-xl" />
        </div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-cst-neutral-01/50 mb-6 w-full max-w-[800px] rounded-md border-[#111113]/10 p-6"
          >
            <Skeleton className="mb-4 h-2 w-1/8" />
            <Skeleton className="mb-4 h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </div>
        ))}
      </section>
    )
  }

  const overview: Overview = data?.data.overview

  return (
    <section className="relative w-full overflow-clip py-24 lg:py-[250px]">
      <div className="absolute inset-0 -z-10 rotate-45 overflow-hidden blur-[250px]">
        <div className="bg-cst-primary absolute top-0 -right-30 h-200 w-200 rounded-full"></div>
        <div className="absolute top-50 -right-30 h-200 w-200 rounded-full bg-[#5A65FF]"></div>
        <div className="bg-cst-secondary absolute -right-50 bottom-0 h-200 w-200 rounded-full"></div>
      </div>
      <div className="absolute inset-0 -z-10 rotate-180 overflow-hidden blur-[250px]">
        <div className="bg-cst-primary absolute top-0 -right-30 h-200 w-200 rounded-full"></div>
        <div className="absolute top-50 -right-30 h-200 w-200 rounded-full bg-[#5A65FF]"></div>
        <div className="bg-cst-secondary absolute -right-50 bottom-0 h-200 w-200 rounded-full"></div>
      </div>
      <div className="mx-auto max-w-[2000px] px-6">
        <div className="relative grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-24">
          <div className="mb-16 self-start lg:sticky lg:top-[100px] lg:mb-0">
            <HeaderAnimation
              text={overview.title}
              className="font-sans text-5xl leading-[0.95] font-extrabold tracking-[-0.05em] text-[#111113] uppercase md:text-7xl lg:text-[7.5rem]"
            />

            <FadeContent blur delay={400} duration={800} className="mt-12 max-w-md">
              <p className="text-[1.1rem] leading-[1.6] text-[#4A4A4A]">{overview.description}</p>
            </FadeContent>
          </div>

          <div className="flex flex-col gap-4 pb-[30vh]">
            {overview.card.map((item: OverviewCard, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  data-index={i}
                  className={`group scroll-mt-[120px] overflow-hidden rounded-md border transition-all duration-500 ${
                    isOpen ? 'border-transparent shadow-sm' : 'border-[#111113]/10'
                  }`}
                  style={{
                    backgroundColor: isOpen ? '#E0E0E0' : '#FFFFFF',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-start justify-between p-8 text-left transition-colors duration-500 md:p-12 lg:p-14"
                  >
                    <div className="flex flex-col gap-6">
                      <span
                        className={`${isOpen ? 'text-cst-neutral-04' : 'text-cst-neutral-02'} text-[4rem] -tracking-[10%]`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`font-sans text-2xl leading-tight tracking-tight md:text-3xl lg:text-4xl ${isOpen ? 'text-[#111113]' : 'text-[#1A1A1A]'}`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-8 pt-0 pb-12 md:px-12 md:pb-16 lg:px-14 lg:pb-20">
                        <div
                          className={`max-w-2xl md:pl-12 lg:pl-16 ${isOpen ? 'border-[#111113]/20' : 'border-cst-primary'}`}
                        >
                          {item.description.split('\n').map((paragraph, idx) => (
                            <p
                              key={idx}
                              className="mb-4 text-[1.05rem] leading-[1.7] text-[#4A4A4A]"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* BOTTOM: INDUSTRIAL TRUST BADGES (Light Theme) */}
        <div className="mt-32 border-t border-[#111113]/10 pt-16">
          <div className="mx-auto grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] items-center gap-8 md:max-w-[50vw]">
            {' '}
            {overview.badges.map((badge: ImageData, i) => (
              <Image
                key={i}
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${badge.url}`}
                alt={badge.alternativeText || 'Trust Badge'}
                width={200}
                height={80}
                className="h-30 w-30 rounded-full object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComplianceSection
