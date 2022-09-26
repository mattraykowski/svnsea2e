/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
import {
  ActorSkills,
  ActorTraits,
  BoundedTrait,
  BoundedValue,
  SS2ActorDataDefinitions,
} from './types';
import { SS2ActorDataProperties } from './actorDataProperties';

export class SS2Actor extends Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();
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
  _prepareTraits(traits: BoundedTrait): BoundedTrait {
    for (const trait of Object.values(traits)) {
      trait.value = this._boundBoundedValue(trait);
    }
    return traits;
  }

  /**
   *
   */
  _prepareSkills(skills: ActorSkills): ActorSkills {
    for (const skill of Object.values(skills)) {
      skill.value = this._boundBoundedValue(skill);
    }

    return skills;
  }

  /**
   * Establish the wound values based on the min and max for the actor type
   */
  _prepareWounds(wounds: BoundedValue): BoundedValue {
    wounds.value = this._boundBoundedValue(wounds);
    return wounds;
  }

  /**
   * Takes a BoundedValue (one with a min and max) and returns a value that
   * is bound within the min/max.
   *
   * @param boundedValue
   */
  _boundBoundedValue(boundedValue: BoundedValue): number {
    return boundedValue.value > boundedValue.max
      ? boundedValue.max
      : boundedValue.value < boundedValue.min
      ? boundedValue.min
      : boundedValue.value;
  }
}
