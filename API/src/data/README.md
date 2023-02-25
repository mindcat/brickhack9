# Description of data file

1. **StarID**: The database primary key from a larger "master database" of stars.

2. **HD (unused)**: The star's ID in the Henry Draper catalog, if known.

3. **HR (unused)**: The star's ID in the Harvard Revised catalog, which is the same as its number in the Yale Bright Star Catalog.

4. **Gliese (unused)**: The star's ID in the third edition of the Gliese Catalog of Nearby Stars.

5. **BayerFlamsteed (unused)**: The Bayer / Flamsteed
designation, from the Fifth Edition of the Yale Bright Star Catalog. This is a combination of the two designations. The Flamsteed number, if present, is given first; then a three-letter abbreviation for the Bayer Greek letter; the Bayer superscript number, if present; and finally, the three-letter constellation abbreviation. Thus Alpha Andromedae has the field value "21Alp And", and Kappa1 Sculptoris (no Flamsteed number) has "Kap1Scl".

6. **RA, Dec**: The star's right ascension and declination, for epoch 2000.0. Stars present only in the Gliese Catalog, which uses 1950.0 coordinates, have had these coordinates precessed to 2000.
ProperName: A common name for the star, such as "Barnard's Star" or "Sirius". I have taken these names primarily from the Hipparcos project's web site, which lists representative names for the 150 brightest stars and many of the 150 closest stars. I have added a few names to this list. Most of the additions are designations from catalogs mostly now forgotten (e.g., Lalande, Groombridge, and Gould ["G."]) except for certain nearby stars which are still best known by these designations.

7. **Distance**: The star's distance in parsecs, the most common unit in astrometry. To convert parsecs to light years, multiply by 3.262. A value of 10000000 indicates missing or dubious (e.g., negative) parallax data in Hipparcos.

8. **Mag**: The star's apparent visual magnitude.

9. **AbsMag**: The star's absolute visual magnitude (its apparent magnitude from a distance of 10 parsecs).

10. **Spectrum**: The star's spectral type, if known.

11. **ColorIndex (unused)**: The star's color index (blue magnitude - visual magnitude), where known.

[Source](https://www.astronexus.com/hyg)