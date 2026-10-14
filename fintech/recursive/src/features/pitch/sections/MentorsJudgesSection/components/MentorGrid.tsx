import { DesktopMentorCard } from "@/features/pitch/sections/MentorsJudgesSection/components/DesktopMentorCard";
import { MobileMentorCarousel } from "@/features/pitch/sections/MentorsJudgesSection/components/MobileMentorCarousel";
import { JudgeSeal } from "@/features/pitch/sections/MentorsJudgesSection/components/JudgeSeal";

export const MentorGrid = () => {
  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline mt-11 md:mt-[60px] w-full">
      <div className="jd-grid-wrap relative w-full max-w-[1376px] mx-auto" data-sealed="true">
        <div className="jd-grid box-border caret-transparent gap-x-3 hidden grid-cols-[repeat(2,minmax(0px,1fr))] outline-[3px] gap-y-3 no-underline w-full md:gap-x-[35.2px] md:grid md:grid-cols-[repeat(3,minmax(0px,1fr))] md:gap-y-[35.2px]">
          <DesktopMentorCard
            ariaLabel="Scope 01: Lorem Ipsum Dolor"
            primaryIconSrc="/images/assets/icon-8.svg"
            secondaryIconSrc="/images/assets/icon-9.svg"
            seatLabel="Lorem 01"
            title="Lorem Ipsum Dolor"
            status="Active"
            category="Consectetur Adipiscing"
            subtitle="Sed do eiusmod tempor"
            groupLabel="Incididunt ut labore et dolore"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
            firstMetricValue="100%"
            firstMetricLabel="Lorem"
            secondMetricValue="24/7"
            secondMetricLabel="Ipsum"
            imageSrc="/images/roadmap/satellite_crop.jpg"
          />

          <DesktopMentorCard
            ariaLabel="Scope 02: Sed Do Eiusmod"
            primaryIconSrc="/images/assets/icon-10.svg"
            secondaryIconSrc="/images/assets/icon-11.svg"
            seatLabel="Lorem 02"
            title="Sed Do Eiusmod"
            status="Prototyping"
            category="Tempor Incididunt"
            subtitle="Ut labore et dolore magna"
            groupLabel="Quis nostrud exercitation"
            description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
            firstMetricValue="0 KB"
            firstMetricLabel="Transit"
            secondMetricValue="100%"
            secondMetricLabel="Verified"
            imageSrc="/images/roadmap/zk_enclave.jpg"
          />

          <DesktopMentorCard
            ariaLabel="Scope 03: Labore Et Dolore"
            primaryIconSrc="/images/assets/icon-12.svg"
            secondaryIconSrc="/images/assets/icon-13.svg"
            seatLabel="Lorem 03"
            title="Labore Et Dolore"
            status="Planned"
            category="Magna Aliqua"
            subtitle="Ullamco laboris nisi ut"
            groupLabel="Aliquip ex ea commodo"
            description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
            firstMetricValue="< 60s"
            firstMetricLabel="Latency"
            secondMetricValue="0%"
            secondMetricLabel="Overhead"
            imageSrc="/images/roadmap/ondc_invoice.jpg"
          />

          <DesktopMentorCard
            ariaLabel="Scope 04: Ut Enim Ad Minim"
            primaryIconSrc="/images/assets/icon-14.svg"
            secondaryIconSrc="/images/assets/icon-9.svg"
            seatLabel="Lorem 04"
            title="Ut Enim Ad Minim"
            status="Pipeline"
            category="Veniam Quis Nostrud"
            subtitle="Exercitation ullamco laboris"
            groupLabel="Commodo consequat duis"
            description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore."
            firstMetricValue="22"
            firstMetricLabel="Modules"
            secondMetricValue="Native"
            secondMetricLabel="Protocol"
            imageSrc="/images/roadmap/dialect_audio.jpg"
          />

          <DesktopMentorCard
            ariaLabel="Scope 05: Exercitation Ullamco"
            primaryIconSrc="/images/assets/icon-15.svg"
            secondaryIconSrc="/images/assets/icon-11.svg"
            seatLabel="Lorem 05"
            title="Exercitation Ullamco"
            status="Planned"
            category="Laboris Nisi Ut"
            subtitle="Aliquip ex ea commodo"
            groupLabel="Consequat duis aute irure"
            description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
            firstMetricValue="10"
            firstMetricLabel="Daily"
            secondMetricValue="Level A"
            secondMetricLabel="Rating"
            imageSrc="/images/roadmap/micro_pension.jpg"
          />

          <DesktopMentorCard
            ariaLabel="Scope 06: Commodo Consequat"
            primaryIconSrc="/images/assets/icon-16.svg"
            secondaryIconSrc="/images/assets/icon-13.svg"
            seatLabel="Lorem 06"
            title="Commodo Consequat"
            status="Review"
            category="Duis Aute Irure"
            subtitle="Dolor in reprehenderit in"
            groupLabel="Voluptate velit esse cillum"
            description="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt."
            firstMetricValue="6"
            firstMetricLabel="Corridors"
            secondMetricValue="Global"
            secondMetricLabel="Rails"
            imageSrc="/images/roadmap/diaspora_inflow.jpg"
          />

          <DesktopMentorCard
            ariaLabel="Scope 07: Dolor In Reprehenderit"
            primaryIconSrc="/images/assets/icon-17.svg"
            secondaryIconSrc="/images/assets/icon-9.svg"
            seatLabel="Lorem 07"
            title="Dolor In Reprehenderit"
            status="Governance"
            category="Voluptate Velit Esse"
            subtitle="Cillum dolore eu fugiat"
            groupLabel="Nulla pariatur excepteur"
            description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias."
            firstMetricValue="0.80"
            firstMetricLabel="Compliance"
            secondMetricValue="Real-Time"
            secondMetricLabel="Audit"
            imageSrc="/images/roadmap/fair_lending.jpg"
          />

          <DesktopMentorCard
            ariaLabel="Scope 08: Cillum Dolore Eu"
            primaryIconSrc="/images/assets/icon-18.svg"
            secondaryIconSrc="/images/assets/icon-11.svg"
            seatLabel="Lorem 08"
            title="Cillum Dolore Eu"
            status="Verified"
            category="Fugiat Nulla Pariatur"
            subtitle="Sint occaecat cupidatat non"
            groupLabel="Proident sunt in culpa"
            description="Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est."
            firstMetricValue="< 35ms"
            firstMetricLabel="Latency"
            secondMetricValue="Standard"
            secondMetricLabel="Security"
            imageSrc="/images/roadmap/graviton_edge.jpg"
          />

          <DesktopMentorCard
            ariaLabel="Scope 09: Excepteur Sint Occaecat"
            primaryIconSrc="/images/assets/icon-19.svg"
            secondaryIconSrc="/images/assets/icon-13.svg"
            seatLabel="Lorem 09"
            title="Excepteur Sint Occaecat"
            status="Planned"
            category="Cupidatat Non Proident"
            subtitle="Sunt in culpa qui officia"
            groupLabel="Deserunt mollit anim id"
            description="Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae."
            firstMetricValue="1,200+"
            firstMetricLabel="Nodes"
            secondMetricValue="Verified"
            secondMetricLabel="Status"
            imageSrc="/images/roadmap/enwr_warehouse.jpg"
          />
        </div>

        <MobileMentorCarousel />

        <JudgeSeal />
      </div>
    </div>
  );
};