<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\SequenceRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=SequenceRepository::class)
 * @ApiResource(
 *      collectionOperations={"get", "post"},
 *      itemOperations={"get", "put", "patch", "delete"},
 * attributes ={
 *   "denormalization_context"={"groups"={"sequence:read"}},
 *   "normalization_context"={"groups"={"sequence:read"}}
 * }
 * )
 */
class Sequence
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", length=255)
     * @Groups("sequence:read")
     */
    private $number1;

    /**
     * @ORM\Column(type="integer", length=255)
     * @Groups("sequence:read")
     */
    private $number2;

    /**
     * @ORM\Column(type="integer", length=255)
     * @Groups("sequence:read")
     */
    private $number3;

    /**
     * @ORM\Column(type="integer", length=255)
     * @Groups("sequence:read")
     */
    private $number4;

    /**
     * @ORM\Column(type="integer", length=255)
     * @Groups("sequence:read")
     */
    private $number5;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumber1(): ?string
    {
        return $this->number1;
    }

    public function setNumber1(string $number1): self
    {
        $this->number1 = $number1;

        return $this;
    }

    public function getNumber2(): ?string
    {
        return $this->number2;
    }

    public function setNumber2(string $number2): self
    {
        $this->number2 = $number2;

        return $this;
    }

    public function getNumber3(): ?string
    {
        return $this->number3;
    }

    public function setNumber3(string $number3): self
    {
        $this->number3 = $number3;

        return $this;
    }

    public function getNumber4(): ?string
    {
        return $this->number4;
    }

    public function setNumber4(string $number4): self
    {
        $this->number4 = $number4;

        return $this;
    }

    public function getNumber5(): ?string
    {
        return $this->number5;
    }

    public function setNumber5(string $number5): self
    {
        $this->number5 = $number5;

        return $this;
    }
}
