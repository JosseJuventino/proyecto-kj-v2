// src/components/BannerInfo.tsx
import React from 'react';
import CommonButton from './Buttons/CommonButton';

interface Banner {
  title: string;
  description: string;
  image: string;
  isReversed: boolean;
  hasButton: boolean;
  buttonText?: string;
}

interface BannerInfoProps {
  bannerInformation: Banner[];
}

const BannerInfo: React.FC<BannerInfoProps> = ({ bannerInformation }) => {
  return (
    <>
      {bannerInformation.map((banner) => (
        <div
          className={`md:flex ${banner.isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
            } md:text-left text-center md:items-center md:justify-around md:px-20 flex flex-col items-center text-3xl justify-center`}
          key={banner.title}
        >
          <div className="md:w-3/6 w-4/5 sm:flex sm:flex-col">
            <h2 className="font-bold sm:text-3xl md:text-3xl lg:text-4xl mb-5">
              {banner.title}
            </h2>
            <p className="text-text-secondary text-sm">
              {banner.description}
            </p>

            {banner.hasButton && (
              <CommonButton
                link="https://www.uca.edu.sv/servicio-social/opciones-de-servicio-social/"
                text={banner.buttonText || ''}
                icon="fa-solid fa-arrow-right"
              />
            )}
          </div>

          <figure className="lg:w-1/5 w-2/4 md:w-1/4">
            <img
              src={banner.image}
              className="object-cover w-full h-full"
              alt="image-banner"
            />
          </figure>
        </div>
      ))}
    </>
  );
};

export default BannerInfo;
