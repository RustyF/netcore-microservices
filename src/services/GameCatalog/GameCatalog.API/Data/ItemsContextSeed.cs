﻿using GameCatalog.API.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace GameCatalog.API.Data
{
    /// <summary>
    /// GameCatalog items seed initializer that is used for testing purposes.
    /// </summary>
    public class ItemsContextSeed
    {

        /// <summary>
        /// Seed data of static products.
        /// </summary>
        /// <param name="productCollection">MongoDb collection</param>
        public static void SeedData(IMongoCollection<Item> productCollection)
        {
            bool existProduct = productCollection.Find(p => true).Any();

            if (!existProduct)
            {
                productCollection.InsertManyAsync(GetPreConfiguredItems());
            }
        }

        /// <summary>
        /// Static list of preconfigured products.
        /// </summary>
        /// <returns>List of preconfigurated products.</returns>
        private static IEnumerable<Item> GetPreConfiguredItems()
        {
            return new List<Item>
            {
                new Item
                {
                    Id = Guid.NewGuid(),
                    Name = "Potion",
                    Description = "Restores a small amount of  HP",
                    Price = 5,
                    CreatedDate = DateTimeOffset.UtcNow
                },
                new Item
                {
                    Id = Guid.NewGuid(),
                    Name = "Antidote",
                    Description = "Cures poison",
                    Price = 7,
                    CreatedDate = DateTimeOffset.UtcNow
                },
                new Item
                {
                    Id = Guid.NewGuid(),
                    Name = "Bronze sword",
                    Description = "Deals a small amout of damage",
                    Price = 20,
                    CreatedDate = DateTimeOffset.UtcNow
                },
            };
        }
    }
}