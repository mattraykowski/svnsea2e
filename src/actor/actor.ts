/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
import {ActorType, SvnseaActorDataPropertiesData} from "./types";

export class SvnSea2EActor extends Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.system;
    // const actorData = this.data.data;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (this.type === ActorType.PlayerCharacter)
      this._preparePlayerCharacterData(actorData);
    if (this.type === ActorType.Hero) this._prepareHeroData(actorData);
    if (this.type === ActorType.Villain || this.type === ActorType.Monster)
      this._prepareVillainData(actorData);
    if (this.type === ActorType.Brute) this._prepareBruteData(actorData);
  }

  /**
   * Keep the value within the minimum and maximum values
   */
  _validateMinMaxData(value: number, min: number, max: number) {
    return value > max ? max : value < min ? min : value;
  }

  /**
   * Prepare Character type specific data
   */
  _preparePlayerCharacterData(actorData: SvnseaActorDataPropertiesData) {
    this._prepareWounds(actorData);
    this._prepareTraits(actorData);
    this._prepareSkills(actorData);
  }

  /**
   * Prepare Hero type specific data
   */
  _prepareHeroData(actorData: SvnseaActorDataPropertiesData) {
    this._prepareWounds(actorData);
    this._prepareTraits(actorData);
    this._prepareSkills(actorData);
  }

  /**
   * Prepare Villain type specific data
   */
  _prepareVillainData(actorData: SvnseaActorDataPropertiesData) {
    const { strength, influence } = actorData.traits;
    this._prepareTraits(actorData);
    actorData.villainy = strength.value + influence.value;
    actorData.wounds.max = strength.value * 5;
    actorData.wounds.value = this._validateMinMaxData(
      actorData.wounds.value,
      actorData.wounds.min,
      actorData.wounds.max,
    );
  }

  /**
   * Prepare Brute type specific data
   */
  _prepareBruteData(actorData: SvnseaActorDataPropertiesData) {
    const { strength } = actorData.traits;
    strength.value = this._validateMinMaxData(strength.value, strength.min, strength.max);
    actorData.wounds.max = actorData.traits.strength.value;
    if (actorData.wounds.max < actorData.wounds.value) {
      actorData.wounds.value = actorData.wounds.max;
    }
  }

  /**
   * Remove a member from the crew
   */
  async removeFromCrew() {
    await this.unsetFlag('svnsea2e', 'crewMember');
  }

  /**
   * Set a crew member's role
   */
  async setCrewMemberRole(shipId: string, role: string) {
    return this.setFlag('svnsea2e', 'crewMember', {
      shipId: shipId,
      role: role,
    });
  }

  /**
   *
   */
  _prepareTraits(actorData: SvnseaActorDataPropertiesData) {
    for (const trait of Object.values(actorData.traits)) {
      trait.value = this._validateMinMaxData(trait.value, trait.min, trait.max);
    }
  }

  /**
   *
   */
  _prepareSkills(actorData: SvnseaActorDataPropertiesData) {
    for (const skill of Object.values(actorData.skills)) {
      skill.value = this._validateMinMaxData(skill.value, skill.min, skill.max);
    }
  }

  /**
   * Establish the wound values based on the min and max for the actor type
   */
  _prepareWounds(actorData: SvnseaActorDataPropertiesData) {
    actorData.wounds.value = this._validateMinMaxData(
      actorData.wounds.value,
      actorData.wounds.min,
      actorData.wounds.max,
    );
  }
}
