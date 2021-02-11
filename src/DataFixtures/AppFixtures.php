<?php

namespace App\DataFixtures;

use App\Entity\Sequence;
use App\Entity\UserSimons;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $sequence1 = new Sequence();
        $sequence1->setNumber1(2)
        ->setNumber2(4)
        ->setNumber3(3)
        ->setNumber4(2)
        ->setNumber5(7);

        $manager->persist($sequence1);
        $manager->flush();

        $sequence2 = new Sequence();
        $sequence2->setNumber1(5)
        ->setNumber2(4)
        ->setNumber3(1)
        ->setNumber4(3)
        ->setNumber5(8);

        $manager->persist($sequence2);
        $manager->flush();

        $sequence3 = new Sequence();
        $sequence3->setNumber1(9)
        ->setNumber2(6)
        ->setNumber3(4)
        ->setNumber4(1)
        ->setNumber5(7);

        $manager->persist($sequence3);
        $manager->flush();

        $sequence4 = new Sequence();
        $sequence4->setNumber1(6)
        ->setNumber2(2)
        ->setNumber3(3)
        ->setNumber4(9)
        ->setNumber5(3);

        $manager->persist($sequence4);
        $manager->flush();

        $sequence5 = new Sequence();
        $sequence5->setNumber1(2)
        ->setNumber2(4)
        ->setNumber3(8)
        ->setNumber4(2)
        ->setNumber5(1);

        $manager->persist($sequence5);
        $manager->flush();

        $user1 = new UserSimons();
        $user1->setName("Roger")
        ->setScore(2703);

        $manager->persist($user1);
        $manager->flush();

        $user1 = new UserSimons();
        $user1->setName("Gilbert")
        ->setScore(2334);

        $manager->persist($user1);
        $manager->flush();

        $user1 = new UserSimons();
        $user1->setName("Valentin")
        ->setScore(2287);

        $manager->persist($user1);
        $manager->flush();
    }
}
